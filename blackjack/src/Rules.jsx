// src/Rules.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Rules = () => {
  return (
    <div className="min-h-screen bg-gradient-radial from-green-800 via-green-900 to-black text-white relative overflow-hidden">
      {/* Patrón de fondo de casino */}
      <div className="absolute inset-0 opacity-5 bg-repeat" style={{
        backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Elementos decorativos flotantes */}
      <div className="absolute top-10 left-10 text-8xl opacity-10 animate-pulse">♠️</div>
      <div className="absolute top-20 right-20 text-8xl opacity-10 animate-pulse">♥️</div>
      <div className="absolute bottom-20 left-20 text-8xl opacity-10 animate-pulse">♦️</div>
      <div className="absolute bottom-10 right-10 text-8xl opacity-10 animate-pulse">♣️</div>
      
      <div className="relative z-10 container mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-5xl">📚</span>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent casino-glow">
              REGLAS DEL BLACKJACK
            </h1>
            <span className="text-5xl">🎯</span>
          </div>
          <p className="text-2xl text-gray-300">Aprende a dominar el juego como un profesional</p>
        </div>

        {/* Contenido principal */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-black bg-opacity-80 p-12 rounded-3xl border-4 border-yellow-400 shadow-2xl shadow-yellow-400/20 backdrop-blur-sm mb-10">
            {/* Decoraciones de esquina */}
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-yellow-400 rotate-45"></div>
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rotate-45"></div>
            <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-yellow-400 rotate-45"></div>
            <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-yellow-400 rotate-45"></div>
            
            {/* Reglas básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-900/50 to-green-950/50 p-6 rounded-2xl border-2 border-green-500/50">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🎯</span>
                    <h3 className="text-2xl font-bold text-green-400">OBJETIVO</h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Obtener una mano cuyo valor sea lo más cercano posible a <span className="text-yellow-400 font-bold">21</span>, sin pasarse.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-900/50 to-blue-950/50 p-6 rounded-2xl border-2 border-blue-500/50">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🃏</span>
                    <h3 className="text-2xl font-bold text-blue-400">VALORES</h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Cartas numéricas: valor nominal • <span className="text-red-400 font-bold">J, Q, K</span>: 10 puntos • <span className="text-yellow-400 font-bold">As</span>: 1 u 11 puntos
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-900/50 to-purple-950/50 p-6 rounded-2xl border-2 border-purple-500/50">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🎲</span>
                    <h3 className="text-2xl font-bold text-purple-400">INICIO</h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Recibes <span className="text-yellow-400 font-bold">dos cartas iniciales</span> y decides si pedir otra carta o plantarte.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-red-900/50 to-red-950/50 p-6 rounded-2xl border-2 border-red-500/50">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">💥</span>
                    <h3 className="text-2xl font-bold text-red-400">BUSTED</h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Si superas <span className="text-red-400 font-bold">21 puntos</span>, pierdes automáticamente ("te pasaste").
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-950/50 p-6 rounded-2xl border-2 border-yellow-500/50">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🎰</span>
                    <h3 className="text-2xl font-bold text-yellow-400">DEALER</h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Cuando te plantas, juega el dealer. Si se pasa, ganas. Si no, gana quien esté más cerca de 21.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-900/50 to-orange-950/50 p-6 rounded-2xl border-2 border-orange-500/50">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">👑</span>
                    <h3 className="text-2xl font-bold text-orange-400">BLACKJACK</h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    <span className="text-yellow-400 font-bold">As + carta de 10</span> en las primeras dos cartas = ¡Blackjack! Pago 3:2
                  </p>
                </div>
              </div>
            </div>

            {/* Acciones del juego */}
            <div className="border-t border-yellow-400/30 pt-8 mb-8">
              <h3 className="text-3xl font-bold text-center text-yellow-400 mb-8">ACCIONES DEL JUGADOR</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-800/30 to-green-900/30 p-6 rounded-xl border border-green-500/30">
                  <div className="text-center">
                    <div className="text-5xl mb-3">🃏</div>
                    <h4 className="text-2xl font-bold text-green-400 mb-3">HIT</h4>
                    <p className="text-gray-300">Pide otra carta para intentar acercarte más a 21</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-red-800/30 to-red-900/30 p-6 rounded-xl border border-red-500/30">
                  <div className="text-center">
                    <div className="text-5xl mb-3">✋</div>
                    <h4 className="text-2xl font-bold text-red-400 mb-3">STAND</h4>
                    <p className="text-gray-300">Conserva tu mano actual y termina tu turno</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/login" 
              className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-black px-12 py-4 text-2xl rounded-2xl hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 transition-all duration-300 font-bold shadow-xl transform hover:scale-105 border-2 border-yellow-300"
            >
              <span className="flex items-center gap-3">
                <span>🎯</span>
                COMENZAR A JUGAR
                <span>🚀</span>
              </span>
            </Link>
            
            <Link 
              to="/" 
              className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white px-8 py-4 text-xl rounded-2xl hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 transition-all duration-300 font-semibold shadow-xl transform hover:scale-105 border-2 border-gray-500"
            >
              <span className="flex items-center gap-2">
                <span>🏠</span>
                Volver al Inicio
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
