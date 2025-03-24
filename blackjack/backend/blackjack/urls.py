from django.urls import path
from .views import blackjack_status  # Importamos la función de la vista

urlpatterns = [
    path('status/', blackjack_status, name='blackjack_status'),  # Ruta de prueba
]
