import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {  const [formData, setFormData] = useState({
    nickname: '',
    password: ''
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
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
        if (data.non_field_errors) {
          setError(data.non_field_errors[0]);
        } else {
          setError('Credenciales incorrectas. Intenta de nuevo.');
        }
      }
    } catch (error) {
      setError('Error de conexión. Verifica que el servidor esté funcionando.');
    }

    setLoading(false);
  };  return (
    <div className="min-h-screen bg-gradient-radial from-green-800 via-green-900 to-black flex justify-center items-center relative overflow-hidden">
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
      
      <div className="relative z-10 bg-gradient-to-br from-black via-gray-900 to-black p-10 rounded-3xl text-white w-96 border-4 border-yellow-400 shadow-2xl shadow-yellow-400/20 backdrop-blur-sm">
        {/* Decoraciones de esquina */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-400 rotate-45"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 rotate-45"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-yellow-400 rotate-45"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-yellow-400 rotate-45"></div>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">🎰</span>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent casino-glow">
              INICIAR SESIÓN
            </h2>
            <span className="text-4xl">🃏</span>
          </div>
          <p className="text-gray-400">Accede a tu cuenta de casino</p>
        </div>
        
        {error && (
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-xl mb-6 text-center border-2 border-red-500 shadow-lg">
            <span className="flex items-center justify-center gap-2">
              <span>⚠️</span>
              {error}
            </span>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">👤</span>
            <input
              type="text"
              name="nickname"
              className="w-full p-4 pl-14 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 placeholder-gray-400"
              placeholder="Nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">🔐</span>
            <input
              type="password"
              name="password"
              className="w-full p-4 pl-14 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 placeholder-gray-400"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-xl transition-all duration-300 transform border-2 ${
              loading 
                ? 'bg-gray-600 border-gray-500 cursor-not-allowed text-gray-400' 
                : 'bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 border-yellow-400 text-black hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 hover:scale-105 shadow-lg hover:shadow-yellow-500/50'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Iniciando sesión...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>🎯</span>
                ENTRAR AL CASINO
              </span>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-gray-600 pt-6">
          <p className="text-gray-400 mb-4">¿No tienes cuenta?</p>
          <Link 
            to="/signup" 
            className="inline-block bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border-2 border-green-500 shadow-lg"
          >
            <span className="flex items-center gap-2">
              <span>✨</span>
              CREAR CUENTA
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

export default Login;
