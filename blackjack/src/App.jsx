import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importamos todos los componentes usando los archivos que me enviaste
import LandingPage from './landingpage.jsx';  // El landing original que enviaste
import Rules from './Rules.jsx';
import Login from './Login.jsx'; 
import Signup from './Signup.jsx';
import Blackjack from './components/blackjack.jsx';  // Tu componente de Blackjack

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/blackjack" element={<Blackjack />} />
      <Route path="/game" element={<Blackjack />} />  {/* Ruta alternativa que apunta al mismo componente */}
    </Routes>
  );
}

export default App;