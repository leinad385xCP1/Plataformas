import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Realiza la solicitud al backend para crear una nueva cuenta
    // Si el registro es exitoso, redirige al juego
    navigate('/blackjack');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-black p-8 rounded-lg text-white w-96">
        <h2 className="text-2xl mb-6 text-center">Crear Cuenta</h2>
        <form onSubmit={handleSignup}>
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
          <button type="submit" className="w-full bg-yellow-500 text-black py-3 rounded-full hover:bg-yellow-400 transition">Crear Cuenta</button>
        </form>
        <p className="mt-4 text-center">
          ¿Ya tienes cuenta? <Link to="/login" className="text-yellow-500">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
