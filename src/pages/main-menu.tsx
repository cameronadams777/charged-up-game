import { FunctionComponent, useEffect } from "react";
import { Link } from "react-router-dom";
import { Backdrop } from "../game/backdrop";
import './main-menu.scss';

export const MainMenuPage: FunctionComponent = () => {

  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
    if(canvas == null) {
      console.error("Game Error: Canvas not found");
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if(ctx == null) {
      console.error("Game Error: Canvas has no rendering context");
      return;
    }

    const backdrop = new Backdrop(canvas);

    const loop = () => {
      window.requestAnimationFrame(loop);

      backdrop.update();
      backdrop.draw(ctx);
    }

    loop();
  }, []);

  return (
    <>
      <div className="main-page">
        <Link 
          to="/game" 
          className="main-page__play-button"
        >
          Play
        </Link>
      </div> 
      <canvas id="game-canvas"></canvas>
    </>
  );
}

