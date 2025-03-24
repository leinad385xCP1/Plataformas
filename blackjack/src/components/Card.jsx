/*import React from 'react'

export default function Card({card}) {
  return (
    <div className='w-24 h-32 bg-white border text-slate-800 rounded-lg shadow-md flex flex-col items-center justify-items-start text-xl animate-[pluse_1s_ease-in-out]'>
  <p className='flex justify-end'>{card.rank}</p>
  <h1 className="text-6xl">{card.suit}</h1>
  </div>
  )
}*/

import React from 'react';

// Componente de la carta
export default function Card({ card }) {
  // Generar la ruta de la imagen utilizando el formato con símbolos
  const cardImage = `/card-images/${card.rank}_of_${card.suit}.png`;

  // Registro de la ruta generada (puedes eliminarlo cuando funcione)
  console.log('Generated image path:', cardImage);

  return (
    <div className="w-24 h-32 bg-white border text-slate-800 rounded-lg shadow-md flex flex-col items-center justify-items-start text-xl animate-[pluse_1s_ease-in-out]">
      <img src={cardImage} alt={`${card.rank}_of_${card.suit}`} className="w-full h-full object-cover rounded-lg" />
    </div>
  );
}