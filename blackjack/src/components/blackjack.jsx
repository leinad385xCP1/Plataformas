import { useState, useEffect } from 'react';
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
    <div className="w-full h-screen bg-slate-900 text-white flex flex-col" >
      <div className="flex justify-between items-center p-4 border-b border-gray-700 shrink-0">
        <h1 className="text-4xl text-center flex-1">BlackJack</h1>
        <Button 
          bg_color="purple" 
          onClick={() => setShowSkinSelector(!showSkinSelector)}
        >
          🎨 Skins
        </Button>
      </div>
      
      {/* Selector de skins */}
      {showSkinSelector && (
        <div className="p-4 border-b border-gray-700 shrink-0">
          <CardSkinSelector 
            onSkinChange={(skinKey) => {
              changeSkin(skinKey);
              setShowSkinSelector(false);
            }}
          />
        </div>
      )}
      
      {gameOver &&  (
        <div className={`text-white ${result.type === "Jugador" ? "bg-green-600" : "bg-red-700"} font-bold text-center p-4 mx-4 mt-4 rounded-md shrink-0`}>
        <h2 className='text-2xl'>{result.message}</h2>
        </div>
      )}
      
      <div className="flex justify-center gap-4 p-4 shrink-0">  
        {!newGame ? (
        <>
          <Button bg_color={"green"} onClick={dealCardToPlayer}>Pide una carta</Button>
          <Button bg_color={"red"} onClick={playerStand}>No pide más</Button>
        </>
      ) : (
        <Button onClick={resetGame} bg_color="blue">Volver a jugar</Button>
      )} 
      </div>
      
      <div className="flex flex-col xl:flex-row justify-center items-start gap-6 p-4 flex-1 overflow-auto">
        <Hand cards={PlayerHand} title={"Mano del jugador"} handValue={playerValue}/>
        <Hand cards={DealerHand} title={"Mano del Dealer"} handValue={dealerValue}/>
      </div>
    </div>
  );


}

export default blackjack;
