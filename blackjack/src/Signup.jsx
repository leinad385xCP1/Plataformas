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
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-black p-8 rounded-lg text-white w-96">
        <h2 className="text-2xl mb-6 text-center">Crear Cuenta</h2>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="nickname"
            className="w-full p-3 mb-4 text-black"
            placeholder="Nickname (nombre en el juego)"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="w-full p-3 mb-4 text-black"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              name="first_name"
              className="w-1/2 p-3 text-black"
              placeholder="Nombre"
              value={formData.first_name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="last_name"
              className="w-1/2 p-3 text-black"
              placeholder="Apellido"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <input
            type="password"
            name="password"
            className="w-full p-3 mb-4 text-black"
            placeholder="Contraseña (mín. 8 caracteres)"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password_confirm"
            className="w-full p-3 mb-4 text-black"
            placeholder="Confirmar contraseña"
            value={formData.password_confirm}
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
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿Ya tienes cuenta? <Link to="/login" className="text-yellow-500">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
