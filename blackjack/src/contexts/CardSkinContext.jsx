import React, { createContext, useContext, useState, useEffect } from 'react';

const CardSkinContext = createContext();

export const useCardSkin = () => {
  const context = useContext(CardSkinContext);
  if (!context) {
    throw new Error('useCardSkin must be used within a CardSkinProvider');
  }
  return context;
};

export const CardSkinProvider = ({ children }) => {
  const [selectedSkin, setSelectedSkin] = useState('classic');
  const [useImages, setUseImages] = useState(false);

  // Cargar skin guardado del localStorage al inicializar
  useEffect(() => {
    const savedSkin = localStorage.getItem('blackjack-card-skin');
    const savedUseImages = localStorage.getItem('blackjack-use-images') === 'true';
    
    if (savedSkin) {
      setSelectedSkin(savedSkin);
    }
    setUseImages(savedUseImages);
  }, []);

  // Guardar skin en localStorage cuando cambie
  const changeSkin = (skinKey) => {
    setSelectedSkin(skinKey);
    localStorage.setItem('blackjack-card-skin', skinKey);
    
    // Si selecciona 'images', activar el modo de imágenes
    if (skinKey === 'images') {
      setUseImages(true);
      localStorage.setItem('blackjack-use-images', 'true');
    } else {
      setUseImages(false);
      localStorage.setItem('blackjack-use-images', 'false');
    }
  };

  const value = {
    selectedSkin,
    useImages,
    changeSkin,
    setUseImages
  };

  return (
    <CardSkinContext.Provider value={value}>
      {children}
    </CardSkinContext.Provider>
  );
};
