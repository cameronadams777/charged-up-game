import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import './main-menu.scss';

export const MainMenuPage: FunctionComponent = () => {
  return (
    <div className="main-page">
      <Link 
        to="/game" 
        className="main-page__play-button"
      >
        Play
      </Link>
    </div> 
  );
}

