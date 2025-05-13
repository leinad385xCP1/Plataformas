import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing";
import Blackjack from "./components/blackjack";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blackjack" element={<Blackjack />} />
      </Routes>
    </Router>
  );
}

export default App;
