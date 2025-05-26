import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { combinations } from '../assets/CardDeck';
import Button from './Button';
import '../App.css';
import Hand from './Hand';
import CardSkinSelector from './CardSkinSelector';
import { useCardSkin } from '../contexts/CardSkinContext';

function blackjack() {
  const { changeSkin } = useCardSkin();
  const [showSkinSelector, setShowSkinSelector] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/status/")
      .then(response => response.json())
      .then(data => console.log("Respuesta del backend:", data))
      .catch(error => console.error("Error al conectar con el backend:", error));
  }, []);

  //TODO: Crear estados del juego
  const [gameDeck, setgameDeck] = useState(combinations);
  const [PlayerHand, setPlayerHand] = useState([]);
  const [DealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState({ type: "", message: "" });
  const [newGame, setNewgame] = useState(false);

  // Carta aleatoria de la baraja
  const getRandomCardFromDeck = () => {
    const randomIndex = Math.floor(Math.random() * gameDeck.length);
    const card = gameDeck[randomIndex];
    const newDeck = gameDeck.filter((_, index) => index !== randomIndex);
    setgameDeck(newDeck);
    return card;
  }
  // dar carta al jugador
  const dealCardToPlayer = () => {
    const newHand = [...PlayerHand, getRandomCardFromDeck()];
    setPlayerHand(newHand);
    const playerValue = calculateHandValue(newHand);

    if (playerValue > 21) {
      // se acaba el juego
      handleGameOver({ type: "Dealer", message: "El jugador se paso! Gano el Dealer!" })

    } else if (playerValue === 21) {
      // se acaba el juego
      handleGameOver({ type: "Jugador", message: "El jugador gano!" })
    }
  }
  // dar carta al dealer
  const playerStand = () => {
    setGameOver(true);
    const newHand = [...PlayerHand, getRandomCardFromDeck()];
    setDealerHand(newHand)
    const dealerValue = calculateHandValue(newHand);
    if (dealerValue > 21) {
      handleGameOver({ type: "Jugador", message: "El Dealer se paso! Gano el Jugador!" })

    }
  }
  const calculateHandValue = (hand) => {
    let value = 0;
    let aCeCount = 0;
    hand.forEach((card) => {
      if (card.rank === "J" || card.rank === "Q" || card.rank === "K") {
        value += 10;
      }
      else if (card.rank === "A") {
        aCeCount += 1;
        value += 11;

      } else {
        value += parseInt(card.rank)
      }
    });
    while (value > 21 & aCeCount > 0) {
      value -= 10;
      aCeCount -= 1;
    }
    return value;
  }

  const sendGameDataToBackend = async (gameData) => {
    try {
      await fetch("http://127.0.0.1:8000/api/partida/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });
    } catch (error) {
      console.error("Error enviando datos al backend:", error);
    }
  };

  const handleGameOver = (result) => {
    setGameOver(true);
    setResult(result);
    setNewgame(true);

    // Preparar datos de la partida
    const gameData = {
      cartas_jugador: PlayerHand,
      cartas_dealer: DealerHand,
      decisiones: [], // Puedes agregar lógica para registrar decisiones si lo deseas
      resultado: result.message,
      fecha_hora: new Date().toISOString(),
      estrategia: "Básica", // Cambia esto si tienes lógica de estrategia
    };
    sendGameDataToBackend(gameData);
  };

  //Reseteo del juego
  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);

    setgameDeck(combinations);
    setResult({ type: "", message: ""})
    setNewgame(false);

    //setCanDraw(true);
    setGameOver(false);
  
  }

const playerValue = calculateHandValue(PlayerHand)
const dealerValue = calculateHandValue(DealerHand)

useEffect(()=>{
  if(PlayerHand.length === 0 && DealerHand.length === 0){
setPlayerHand([getRandomCardFromDeck(),getRandomCardFromDeck()])
setDealerHand([getRandomCardFromDeck()])
  }
  if (playerValue === 21){
    handleGameOver({type:"Jugador", message:"Gana el Jugador!"})
  
  }else if (dealerValue === 21){
    handleGameOver({type:"Dealer", message:"Gana el Dealer!"})
  }
  if(gameOver && DealerHand.length <= 5){
      switch (true) {
      case playerValue === 21:
      setResult({ type:"Jugador", message:"Gana el Jugador!"});
      break;
      case playerValue > 21:
      setResult({ type: "Dealer", message: "El jugador se paso! Gano el Dealer!" });
      break;
      case dealerValue < playerValue:
      playerStand();
      break;
      case dealerValue === playerValue && DealerHand.length <=5:
      setResult({ type: "", message: "Empate" });
      setNewgame(true);
      break;
      case dealerValue > playerValue && dealerValue <= 21:
        setResult({ type: "dealer", message: "Gana el Dealer!" });
        setNewgame(true);
        break;
      default:
      break;
      }
  }
},[PlayerHand,DealerHand, gameOver])
  return (
    <div className="w-full h-screen bg-gradient-radial from-green-800 via-green-900 to-green-950 text-white flex flex-col relative overflow-hidden">
      {/* Patrón de fondo de mesa de casino */}
      <div className="absolute inset-0 opacity-10 bg-repeat" style={{
        backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Header con estilo de casino */}
      <div className="relative z-10 flex justify-between items-center p-4 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 border-b-4 border-yellow-400 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-2xl">♠️</span>
          <Link to="/" className="hover:scale-105 transition-transform duration-300">
            <h1 className="text-4xl font-bold text-black drop-shadow-lg cursor-pointer hover:text-gray-800 transition-colors duration-300">
              BLACKJACK
            </h1>
          </Link>
          <span className="text-2xl">♥️</span>
        </div>
        <Button 
          bg_color="purple" 
          onClick={() => setShowSkinSelector(!showSkinSelector)}
        >
          🎨 Skins
        </Button>
      </div>
      
      {/* Selector de skins */}
      {showSkinSelector && (
        <div className="relative z-20 p-4 bg-black bg-opacity-80 border-b border-yellow-400">
          <CardSkinSelector 
            onSkinChange={(skinKey) => {
              changeSkin(skinKey);
              setShowSkinSelector(false);
            }}
          />
        </div>
      )}
      
      {/* Área del Dealer */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            {/* Sección del Dealer */}
            <div className="mb-8">
              <div className="text-center mb-4">
                <div className="inline-block bg-black bg-opacity-60 px-6 py-2 rounded-full border-2 border-yellow-400">
                  <h2 className="text-xl font-bold text-yellow-400">🎩 DEALER</h2>
                </div>
              </div>
              <div className="flex justify-center">
                <Hand cards={DealerHand} title={""} handValue={dealerValue} isDealer={true}/>
              </div>
            </div>
            
            {/* Línea divisoria de la mesa */}
            <div className="flex items-center justify-center my-8">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"></div>
              <div className="mx-4 px-6 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-bold rounded-full text-sm border-2 border-yellow-300 shadow-lg">
                <span className="flex items-center gap-2">
                  <span>♠️</span>
                  BLACKJACK PAYS 3:2
                  <span>♥️</span>
                </span>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"></div>
            </div>
            
            {/* Fichas decorativas */}
            <div className="absolute top-4 left-4 flex gap-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-2 border-white shadow-lg chip-bounce"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border-2 border-white shadow-lg chip-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-700 border-2 border-white shadow-lg chip-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
            
            <div className="absolute top-4 right-4 flex gap-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 border-2 border-white shadow-lg chip-bounce" style={{animationDelay: '0.6s'}}></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 border-2 border-white shadow-lg chip-bounce" style={{animationDelay: '0.8s'}}></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-pink-700 border-2 border-white shadow-lg chip-bounce" style={{animationDelay: '1s'}}></div>
            </div>
            
            {/* Sección del Jugador */}
            <div className="mt-8">
              <div className="flex justify-center mb-4">
                <Hand cards={PlayerHand} title={""} handValue={playerValue} isDealer={false}/>
              </div>
              <div className="text-center">
                <div className="inline-block bg-blue-600 bg-opacity-80 px-6 py-2 rounded-full border-2 border-blue-400">
                  <h2 className="text-xl font-bold text-white">👤 JUGADOR</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Panel de control inferior */}
      <div className="relative z-10 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-t-4 border-yellow-400 p-4">
        {/* Mensaje de resultado */}
        {gameOver && (
          <div className={`text-white ${result.type === "Jugador" ? "bg-green-600" : "bg-red-700"} font-bold text-center p-4 mb-4 rounded-lg border-2 ${result.type === "Jugador" ? "border-green-400" : "border-red-500"} shadow-lg`}>
            <h2 className='text-2xl'>{result.message}</h2>
          </div>
        )}
        
        {/* Botones de acción */}
        <div className="flex justify-center gap-4">  
          {!newGame ? (
          <>
            <Button bg_color={"green"} onClick={dealCardToPlayer}>
              <span className="flex items-center gap-2">
                <span>🃏</span>
                HIT
              </span>
            </Button>
            <Button bg_color={"red"} onClick={playerStand}>
              <span className="flex items-center gap-2">
                <span>✋</span>
                STAND
              </span>
            </Button>
          </>
        ) : (
          <Button onClick={resetGame} bg_color="blue">
            <span className="flex items-center gap-2">
              <span>🔄</span>
              NUEVO JUEGO
            </span>
          </Button>
        )} 
        </div>
      </div>
    </div>
  );


}

export default blackjack;
