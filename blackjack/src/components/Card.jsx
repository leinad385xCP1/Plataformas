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

export default function Card({ card }) {
  // Generate the image path based on card rank and suit
  const cardImage = `/card-images/${card.rank.toLowerCase()}_of_${card.suit.toLowerCase()}.png`;

  // Log the generated image path to check if it's correct
  console.log('Generated image path:', cardImage);

  return (
    <div className="w-24 h-32 bg-white border text-slate-800 rounded-lg shadow-md flex flex-col items-center justify-items-start text-xl animate-[pluse_1s_ease-in-out]">
      <img src={cardImage} alt={`${card.rank}_of_${card.suit}`} className="w-full h-full object-cover rounded-lg" />
    </div>
  );
}