import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gradient-radial from-green-800 via-green-900 to-black text-white min-h-screen flex flex-col scroll-smooth overflow-x-hidden">
      {/* Patrón de fondo de casino */}
      <div className="fixed inset-0 opacity-5 bg-repeat z-0" style={{
        backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 bg-gradient-to-r from-black via-gray-900 to-black border-b-4 border-yellow-400 shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🎰</span>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent casino-glow">
            BLACKJACK MASTER
          </h1>
          <span className="text-4xl">♠️</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features" className="hover:text-yellow-400 transition-colors duration-300 font-semibold">Características</a></li>
            <li><a href="#how-to-play" className="hover:text-yellow-400 transition-colors duration-300 font-semibold">Cómo Jugar</a></li>
            <li>
              <Link to="/login" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-4 py-2 rounded-lg border-2 border-blue-400 transition-all duration-300 font-semibold shadow-lg">
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link to="/signup" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 px-4 py-2 rounded-lg border-2 border-green-400 transition-all duration-300 font-semibold shadow-lg">
                Registrarse
              </Link>
            </li>
          </ul>
        </nav>
      </header>      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center h-screen">
        {/* Efectos de luces de casino */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-900/10 to-transparent"></div>
        
        <div className="relative bg-black bg-opacity-80 p-16 rounded-3xl border-4 border-yellow-400 shadow-2xl shadow-yellow-400/20 backdrop-blur-sm">
          {/* Decoraciones de esquina */}
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 rotate-45"></div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rotate-45"></div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-yellow-400 rotate-45"></div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rotate-45"></div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-6xl animate-bounce">♠️</span>
            <h2 className="text-6xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent casino-glow">
              ¡BIENVENIDO AL CASINO!
            </h2>
            <span className="text-6xl animate-bounce">♥️</span>
          </div>
          
          <p className="text-2xl mb-8 text-gray-300">
            Disfruta de una experiencia de <span className="text-yellow-400 font-bold">Blackjack auténtica</span> y gana en grande.
          </p>
          
          <div className="flex gap-6 justify-center">
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-black px-10 py-4 text-2xl rounded-2xl hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 transition-all duration-300 font-bold shadow-xl transform hover:scale-105 border-2 border-yellow-300"
            >
              🎯 COMIENZA A JUGAR
            </Link>
            <Link 
              to="/login" 
              className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white px-10 py-4 text-2xl rounded-2xl hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 transition-all duration-300 font-bold shadow-xl transform hover:scale-105 border-2 border-gray-500"
            >
              🔐 YA TENGO CUENTA
            </Link>
          </div>
          
          {/* Estadísticas decorativas */}
          <div className="flex justify-center gap-8 mt-8 pt-8 border-t border-yellow-400/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">21</div>
              <div className="text-sm text-gray-400">OBJETIVO</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">3:2</div>
              <div className="text-sm text-gray-400">BLACKJACK</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">∞</div>
              <div className="text-sm text-gray-400">DIVERSIÓN</div>
            </div>
          </div>
        </div>
      </section>      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="container mx-auto text-center px-6">
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="text-4xl">🎲</span>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              CARACTERÍSTICAS PREMIUM
            </h3>
            <span className="text-4xl">🎲</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-red-900/50 to-red-950/50 p-8 rounded-2xl border-2 border-red-500/50 hover:border-red-400 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-red-500/20">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🃏</div>
              <h4 className="text-2xl font-bold text-red-400 mb-4">Cartas Profesionales</h4>
              <p className="text-gray-300 leading-relaxed">
                Disfruta de múltiples estilos de cartas con diseños únicos: clásico, neón, real, minimalista y más.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-green-900/50 to-green-950/50 p-8 rounded-2xl border-2 border-green-500/50 hover:border-green-400 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-green-500/20">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">💎</div>
              <h4 className="text-2xl font-bold text-green-400 mb-4">Mesa Auténtica</h4>
              <p className="text-gray-300 leading-relaxed">
                Experimenta la sensación real de un casino con nuestra mesa de blackjack profesional.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-blue-900/50 to-blue-950/50 p-8 rounded-2xl border-2 border-blue-500/50 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/20">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">⚡</div>
              <h4 className="text-2xl font-bold text-blue-400 mb-4">Experiencia Fluida</h4>
              <p className="text-gray-300 leading-relaxed">
                Interfaz intuitiva con animaciones suaves y efectos visuales impresionantes para máxima inmersión.
              </p>
            </div>
          </div>
          
          {/* Elementos decorativos */}
          <div className="flex justify-center gap-12 mt-16 opacity-30">
            <span className="text-8xl">♠</span>
            <span className="text-8xl">♥</span>
            <span className="text-8xl">♦</span>
            <span className="text-8xl">♣</span>
          </div>
        </div>
      </section>      {/* How to Play Section */}
      <section id="how-to-play" className="relative z-10 py-20 bg-gradient-to-b from-green-900/80 to-green-950/80">
        <div className="container mx-auto text-center px-6">
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="text-4xl">📚</span>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              ¿CÓMO JUGAR?
            </h3>
            <span className="text-4xl">🎯</span>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/60 backdrop-blur-sm p-12 rounded-3xl border-2 border-green-400/50 shadow-2xl">
              <p className="text-2xl mb-8 text-gray-300 leading-relaxed">
                Aprende las reglas básicas de <span className="text-green-400 font-bold">Blackjack</span> en minutos. 
                <br />Es fácil comenzar a jugar y <span className="text-yellow-400 font-bold">ganar en grande</span>.
              </p>
              
              {/* Reglas rápidas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-950/30 p-6 rounded-xl border border-yellow-500/30">
                  <div className="text-4xl mb-3">🎯</div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">OBJETIVO</h4>
                  <p className="text-gray-300">Llegar a 21 sin pasarse</p>
                </div>
                <div className="bg-gradient-to-br from-red-900/30 to-red-950/30 p-6 rounded-xl border border-red-500/30">
                  <div className="text-4xl mb-3">✋</div>
                  <h4 className="text-xl font-bold text-red-400 mb-2">STAND</h4>
                  <p className="text-gray-300">Conserva tu mano actual</p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 p-6 rounded-xl border border-blue-500/30">
                  <div className="text-4xl mb-3">🃏</div>
                  <h4 className="text-xl font-bold text-blue-400 mb-2">HIT</h4>
                  <p className="text-gray-300">Pide otra carta</p>
                </div>
              </div>
              
              <Link 
                to="/rules" 
                className="inline-block bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-black px-10 py-4 text-xl rounded-2xl hover:from-green-400 hover:via-green-500 hover:to-green-600 transition-all duration-300 font-bold shadow-xl transform hover:scale-105 border-2 border-green-300"
              >
                📖 VER REGLAS COMPLETAS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black border-t-4 border-yellow-400 text-center py-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-2xl">🏆</span>
          <p className="text-xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            BLACKJACK MASTER
          </p>
          <span className="text-2xl">🏆</span>
        </div>
        <p className="text-gray-400">&copy; 2025 Blackjack Master. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-8 mt-4 opacity-50">
          <span className="text-3xl">♠️</span>
          <span className="text-3xl">♥️</span>
          <span className="text-3xl">♦️</span>
          <span className="text-3xl">♣️</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;


