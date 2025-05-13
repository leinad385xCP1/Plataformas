from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
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