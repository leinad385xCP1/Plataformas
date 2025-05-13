// src/Rules.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Rules = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-10">
      <h1 className="text-4xl font-bold text-yellow-500 mb-6">Reglas del Blackjack</h1>
      <div className="text-lg leading-relaxed space-y-4">
        <p>1. El objetivo del juego es obtener una mano cuyo valor sea lo más cercano posible a 21, sin pasarse.</p>
        <p>2. Cada carta numérica tiene su valor, las J, Q y K valen 10 puntos, y los As pueden valer 1 u 11.</p>
        <p>3. El jugador recibe dos cartas iniciales y puede decidir si "pide otra carta" o "se planta".</p>
        <p>4. Si el jugador supera los 21 puntos, pierde automáticamente ("se pasó").</p>
        <p>5. Cuando el jugador se planta, es el turno del dealer. Si el dealer se pasa, gana el jugador. De lo contrario, gana quien esté más cerca de 21.</p>
      </div>
      <div className="mt-10">
        <Link to="/login" className="bg-yellow-500 text-black px-6 py-3 text-xl rounded-full hover:bg-yellow-400 transition">
          Comenzar a jugar
        </Link>
      </div>
    </div>
  );
};

export default Rules;
