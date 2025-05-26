import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones del frontend
    if (formData.password !== formData.password_confirm) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar token en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('nickname', data.nickname);
        
        // Redirigir al juego
        navigate('/blackjack');
      } else {
        // Mostrar errores del backend
        if (data.nickname) {
          setError(data.nickname[0]);
        } else if (data.username) {
          setError(data.username[0]);
        } else if (data.email) {
          setError(data.email[0]);
        } else {
          setError('Error al crear la cuenta. Intenta de nuevo.');
        }
      }
    } catch (error) {
      setError('Error de conexión. Verifica que el servidor esté funcionando.');
    }

    setLoading(false);
  };  return (
    <div className="min-h-screen bg-gradient-radial from-green-800 via-green-900 to-black flex justify-center items-center relative overflow-hidden p-4">
      {/* Patrón de fondo de casino */}
      <div className="absolute inset-0 opacity-5 bg-repeat" style={{
        backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Elementos decorativos flotantes */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-pulse">♠️</div>
      <div className="absolute top-20 right-20 text-6xl opacity-20 animate-pulse">♥️</div>
      <div className="absolute bottom-20 left-20 text-6xl opacity-20 animate-pulse">♦️</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-pulse">♣️</div>
      
      <div className="relative z-10 bg-gradient-to-br from-black via-gray-900 to-black p-10 rounded-3xl text-white w-full max-w-md border-4 border-yellow-400 shadow-2xl shadow-yellow-400/20 backdrop-blur-sm">
        {/* Decoraciones de esquina */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-400 rotate-45"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 rotate-45"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-yellow-400 rotate-45"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-yellow-400 rotate-45"></div>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">✨</span>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent casino-glow">
              CREAR CUENTA
            </h2>
            <span className="text-4xl">🎰</span>
          </div>
          <p className="text-gray-400">Únete al casino más exclusivo</p>
        </div>
        
        {error && (
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-xl mb-6 text-center border-2 border-red-500 shadow-lg">
            <span className="flex items-center justify-center gap-2">
              <span>⚠️</span>
              {error}
            </span>
          </div>
        )}
        
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Nickname */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🎮</span>
            <input
              type="text"
              name="nickname"
              className="w-full p-4 pl-14 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 placeholder-gray-400"
              placeholder="Nickname (nombre en el juego)"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Email */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">📧</span>
            <input
              type="email"
              name="email"
              className="w-full p-4 pl-14 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 placeholder-gray-400"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">👤</span>
              <input
                type="text"
                name="first_name"
                className="w-full p-3 pl-10 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 placeholder-gray-400 text-sm"
                placeholder="Nombre"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">👥</span>
              <input
                type="text"
                name="last_name"
                className="w-full p-3 pl-10 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 placeholder-gray-400 text-sm"
                placeholder="Apellido"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          
          {/* Contraseña */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🔐</span>
            <input
              type="password"
              name="password"
              className="w-full p-4 pl-14 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 placeholder-gray-400"
              placeholder="Contraseña (mín. 8 caracteres)"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Confirmar Contraseña */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🔒</span>
            <input
              type="password"
              name="password_confirm"
              className="w-full p-4 pl-14 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 placeholder-gray-400"
              placeholder="Confirmar contraseña"
              value={formData.password_confirm}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-xl transition-all duration-300 transform border-2 mt-6 ${
              loading 
                ? 'bg-gray-600 border-gray-500 cursor-not-allowed text-gray-400' 
                : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700 border-green-400 text-white hover:from-green-400 hover:via-green-500 hover:to-green-600 hover:scale-105 shadow-lg hover:shadow-green-500/50'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Creando cuenta...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>🚀</span>
                UNIRSE AL CASINO
              </span>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-gray-600 pt-6">
          <p className="text-gray-400 mb-4">¿Ya tienes cuenta?</p>
          <Link 
            to="/login" 
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border-2 border-blue-500 shadow-lg"
          >
            <span className="flex items-center gap-2">
              <span>🔑</span>
              INICIAR SESIÓN
            </span>
          </Link>
        </div>
        
        {/* Link para volver */}
        <div className="mt-6 text-center">
          <Link 
            to="/" 
            className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 text-sm"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
