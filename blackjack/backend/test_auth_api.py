"""
Pruebas de la API de autenticación con nickname
Ejecutar con: python test_auth_api.py
"""

import requests
import json

BASE_URL = "http://127.0.0.1:8000/api"

def test_register():
    """Prueba el registro de usuario con nickname"""
    print("=== Prueba de Registro ===")
    
    data = {
        "username": "jugador1",
        "email": "jugador1@example.com",
        "password": "mipassword123",
        "password_confirm": "mipassword123",
        "nickname": "ProGamer123",
        "first_name": "Juan",
        "last_name": "Pérez"
    }
    
    response = requests.post(f"{BASE_URL}/auth/register/", json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 201:
        return response.json()["token"]
    return None

def test_login():
    """Prueba el login de usuario"""
    print("\n=== Prueba de Login ===")
    
    data = {
        "username": "jugador1",
        "password": "mipassword123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login/", json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 200:
        return response.json()["token"]
    return None

def test_profile(token):
    """Prueba obtener el perfil del usuario"""
    print("\n=== Prueba de Perfil ===")
    
    headers = {
        "Authorization": f"Token {token}"
    }
    
    response = requests.get(f"{BASE_URL}/auth/profile/", headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")

def test_logout(token):
    """Prueba cerrar sesión"""
    print("\n=== Prueba de Logout ===")
    
    headers = {
        "Authorization": f"Token {token}"
    }
    
    response = requests.post(f"{BASE_URL}/auth/logout/", headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")

def test_duplicate_nickname():
    """Prueba registro con nickname duplicado"""
    print("\n=== Prueba de Nickname Duplicado ===")
    
    data = {
        "username": "jugador2",
        "email": "jugador2@example.com",
        "password": "mipassword123",
        "password_confirm": "mipassword123",
        "nickname": "ProGamer123",  # Mismo nickname que antes
        "first_name": "María",
        "last_name": "González"
    }
    
    response = requests.post(f"{BASE_URL}/auth/register/", json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")

if __name__ == "__main__":
    print("🎮 Probando API de Autenticación de Blackjack con Nickname 🎮\n")
    
    # Probar registro
    token = test_register()
    
    if token:
        # Probar perfil
        test_profile(token)
        
        # Probar logout
        test_logout(token)
        
        # Probar login después de logout
        token = test_login()
        
        if token:
            test_profile(token)
    
    # Probar nickname duplicado
    test_duplicate_nickname()
    
    print("\n✅ Pruebas completadas!")
