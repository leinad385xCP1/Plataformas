from django.urls import path
from .views import (
    blackjack_status, 
    partida_webhook,
    register,
    login_view,
    logout_view,
    profile
)

urlpatterns = [
    path('status/', blackjack_status, name='blackjack_status'),
    path('partida/', partida_webhook, name='partida_webhook'),
    # Autenticación
    path('auth/register/', register, name='register'),
    path('auth/login/', login_view, name='login'),
    path('auth/logout/', logout_view, name='logout'),
    path('auth/profile/', profile, name='profile'),
]
