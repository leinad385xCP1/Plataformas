import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col scroll-smooth">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-black bg-opacity-50">
        <h1 className="text-4xl font-bold text-yellow-500">Blackjack Master</h1>
        <nav>
          <ul className="flex space-x-6">
            {/* 🔄 Cambiado de <Link> a <a> para anclas internas */}
            <li><a href="#features" className="hover:text-yellow-500">Características</a></li>
            <li><a href="#how-to-play" className="hover:text-yellow-500">Cómo Jugar</a></li>
            {/* ✔ Mantener Link para rutas */}
            <li><Link to="/login" className="hover:text-yellow-500">Iniciar Sesión</Link></li>
            <li><Link to="/signup" className="hover:text-yellow-500">Registrarse</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center bg-cover bg-center h-screen" style={{ backgroundImage: "url('/assets/blackjack-bg.jpg')" }}>
        <div className="bg-black bg-opacity-50 p-12">
          <h2 className="text-5xl font-bold mb-4">¡Bienvenido a Blackjack Master!</h2>
          <p className="text-xl mb-6">Disfruta de una experiencia de juego auténtica y gana en grande.</p>
          <Link to="/login" className="bg-yellow-500 text-black px-6 py-3 text-xl rounded-full hover:bg-yellow-400 transition">Comienza a Jugar</Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-yellow-500 mb-6">Características del Juego</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-black p-8 rounded-xl">
              <h4 className="text-xl font-semibold text-yellow-500 mb-4">Juega en Vivo</h4>
              <p>Disfruta de partidas de Blackjack en tiempo real con jugadores de todo el mundo.</p>
            </div>
            <div className="bg-black p-8 rounded-xl">
              <h4 className="text-xl font-semibold text-yellow-500 mb-4">Bonos Especiales</h4>
              <p>Obtén bonos y promociones exclusivas para mejorar tu experiencia de juego.</p>
            </div>
            <div className="bg-black p-8 rounded-xl">
              <h4 className="text-xl font-semibold text-yellow-500 mb-4">Interfaz Intuitiva</h4>
              <p>Disfruta de una interfaz amigable y fácil de usar para una experiencia de juego sin interrupciones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section id="how-to-play" className="py-20 bg-gray-800">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-yellow-500 mb-6">¿Cómo Jugar?</h3>
          <p className="text-xl mb-6">Aprende las reglas básicas de Blackjack en minutos. Es fácil comenzar a jugar y ganar.</p>
          <Link to="/rules" className="bg-yellow-500 text-black px-6 py-3 text-xl rounded-full hover:bg-yellow-400 transition">Ver Reglas</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-6">
        <p>&copy; 2025 Blackjack Master. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;


