from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.

def blackjack_status(request):
    data = {
        "message": "Bienvenido al backend de Blackjack!",
        "status": "OK"
    }
    return JsonResponse(data)