import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Bienvenido al Blackjack</h1>
      <p className="mt-4">Haz clic en el botón para jugar</p>
      <Link to="/blackjack">
        <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg">
          Jugar Blackjack
        </button>
      </Link>
    </div>
  );
}

export default Landing;
