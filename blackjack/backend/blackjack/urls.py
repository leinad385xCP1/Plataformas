from django.urls import path
from .views import blackjack_status, partida_webhook

urlpatterns = [
    path('status/', blackjack_status, name='blackjack_status'),
    path('partida/', partida_webhook, name='partida_webhook'),
]
