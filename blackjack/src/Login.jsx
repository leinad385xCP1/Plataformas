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
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-black p-8 rounded-lg text-white w-96">
        <h2 className="text-2xl mb-6 text-center">Iniciar Sesión</h2>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>          <input
            type="text"
            name="nickname"
            className="w-full p-3 mb-4 text-black"
            placeholder="Nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="w-full p-3 mb-4 text-black"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-full transition ${
              loading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-yellow-500 text-black hover:bg-yellow-400'
            }`}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿No tienes cuenta? <Link to="/signup" className="text-yellow-500">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
