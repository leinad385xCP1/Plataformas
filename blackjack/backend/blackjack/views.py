from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import PlayerProfile
from .serializers import UserRegistrationSerializer, UserLoginSerializer, PlayerProfileSerializer
import json
import requests
from datetime import datetime

# Create your views here.

ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22908093/2njxta5/"  # Reemplaza por tu URL real

def blackjack_status(request):
    data = {
        "message": "Bienvenido al backend de Blackjack!",
        "status": "OK"
    }
    return JsonResponse(data)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """Registro de nuevos usuarios con nickname"""
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        profile = PlayerProfile.objects.get(user=user)
        return Response({
            'message': 'Usuario registrado exitosamente',
            'token': token.key,
            'user_id': user.id,
            'nickname': profile.nickname
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """Inicio de sesión de usuarios"""
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        try:
            profile = PlayerProfile.objects.get(user=user)
            nickname = profile.nickname
        except PlayerProfile.DoesNotExist:
            nickname = user.username
        return Response({
            'message': 'Inicio de sesión exitoso',
            'token': token.key,
            'user_id': user.id,
            'nickname': nickname
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Cerrar sesión"""
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Sesión cerrada exitosamente'}, status=status.HTTP_200_OK)
    except:
        return Response({'error': 'Error al cerrar sesión'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    """Obtener perfil del usuario autenticado"""
    try:
        profile = PlayerProfile.objects.get(user=request.user)
        serializer = PlayerProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except PlayerProfile.DoesNotExist:
        # Crear perfil si no existe (para usuarios antiguos)
        profile = PlayerProfile.objects.create(user=request.user, nickname=request.user.username)
        serializer = PlayerProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

@csrf_exempt
@require_POST
def partida_webhook(request):
    try:
        data = json.loads(request.body)
        payload = {
            "cartas_jugador": data.get("cartas_jugador", []),
            "cartas_dealer": data.get("cartas_dealer", []),
            "decisiones": data.get("decisiones", []),
            "resultado": data.get("resultado", ""),
            "fecha_hora": data.get("fecha_hora", datetime.now().isoformat()),
            "estrategia": data.get("estrategia", ""),
        }
        r = requests.post(ZAPIER_WEBHOOK_URL, json=payload)
        return JsonResponse({"status": "ok", "zapier_status": r.status_code})
    except Exception as e:
        return JsonResponse({"status": "error", "detail": str(e)}, status=400)