import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import './main-menu.css';

export const MainMenuPage: FunctionComponent = () => {
  return (
    <div className="main-page">
      <Link to="/game" className="play-button">Play</Link>
    </div> 
  );
}

