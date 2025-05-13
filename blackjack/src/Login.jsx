import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Realiza la solicitud al backend para verificar las credenciales
    // Si las credenciales son correctas, redirige al juego
    navigate('/blackjack');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-black p-8 rounded-lg text-white w-96">
        <h2 className="text-2xl mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="w-full p-3 mb-4 text-black"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-3 mb-4 text-black"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-yellow-500 text-black py-3 rounded-full hover:bg-yellow-400 transition">Iniciar Sesión</button>
        </form>
        <p className="mt-4 text-center">
          ¿No tienes cuenta? <Link to="/signup" className="text-yellow-500">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
