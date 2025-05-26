from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import PlayerProfile

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    nickname = serializers.CharField(max_length=50)
    
    class Meta:
        model = User
        fields = ('email', 'password', 'password_confirm', 'nickname', 'first_name', 'last_name')
    
    def validate_nickname(self, value):
        if PlayerProfile.objects.filter(nickname=value).exists():
            raise serializers.ValidationError("Este nickname ya está en uso")
        # También verificar que no exista un usuario con ese username
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nickname ya está en uso")
        return value
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        return attrs
    
    def create(self, validated_data):
        nickname = validated_data.pop('nickname')
        validated_data.pop('password_confirm')
        # Usar el nickname como username
        validated_data['username'] = nickname
        user = User.objects.create_user(**validated_data)
        # Crear el perfil del jugador con nickname
        PlayerProfile.objects.create(user=user, nickname=nickname)
        return user

class UserLoginSerializer(serializers.Serializer):
    nickname = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        nickname = attrs.get('nickname')
        password = attrs.get('password')
        
        if nickname and password:
            # Buscar el usuario por nickname (que también es el username)
            user = authenticate(username=nickname, password=password)
            if not user:
                raise serializers.ValidationError('Credenciales inválidas')
            if not user.is_active:
                raise serializers.ValidationError('Cuenta de usuario desactivada')
            attrs['user'] = user
        else:
            raise serializers.ValidationError('Debe incluir nickname y password')
        return attrs

class PlayerProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = PlayerProfile
        fields = ('username', 'email', 'nickname', 'games_played', 'games_won', 'total_winnings', 'win_rate', 'created_at')