import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import LandingPage from './landingpage.jsx';
import Rules from './Rules.jsx';
import Login from './Login.jsx'; // Si ya lo tienes
import Register from './Signup.jsx'; // Si ya lo tienes

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>
);

