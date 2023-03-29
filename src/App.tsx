import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { GamePage } from "./pages/game";
import { LeaderboardPage } from "./pages/leaderboard";
import { MainMenuPage } from "./pages/main-menu";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/" element={<MainMenuPage />} />
        </Routes>
    </Router>
  );
}

export default App
