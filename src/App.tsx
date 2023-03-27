import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { GamePage } from "./pages/game";
import { LeaderboardPage } from "./pages/leaderboard";
function App() {

  return (
    <Router>
        <Routes>
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/" element={<GamePage />} />
        </Routes>
    </Router>
  );
}

export default App
