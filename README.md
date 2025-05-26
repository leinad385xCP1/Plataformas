ejecutar backend

    cd backend/
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    python manage.py runserver

ejecutar front

    npm run dev
    
ejecutar backend

    cd backend/
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    python manage.py runserver

ejecutar front

    npm run dev
    
revisar migraciones de la base de datos (dentro del entorno virtual)

    python manage.py showmigrations

revisar la base de datos!

python manage.py shell -c "
from django.contrib.auth.models import User
from blackjack.models import PlayerProfile

print('=== USUARIOS REGISTRADOS ===')
users = User.objects.all()
if users:
    for user in users:
        print(f'ID: {user.id} | Username: {user.username} | Email: {user.email} | Activo: {user.is_active} | Fecha registro: {user.date_joined}')
else:
    print('No hay usuarios registrados')

print('\\n=== PERFILES DE JUGADORES ===')
profiles = PlayerProfile.objects.all()
if profiles:
    for profile in profiles:
        print(f'Usuario: {profile.user.username} | Nickname: {profile.nickname} | Partidas: {profile.games_played} | Victorias: {profile.games_won}')
else:
    print('No hay perfiles de jugadores')
"
