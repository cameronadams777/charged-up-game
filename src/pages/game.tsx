import { FunctionComponent, useEffect } from "react";
import { Game } from "../game";

export const GamePage: FunctionComponent = () => {
  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
    if (canvas != null) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const ctx = canvas.getContext("2d");

      if (ctx == null) {
        console.error("Game Error: Canvas 2D Context not found");
        return;
      }

      // Customize canvas context 
      ctx.font = '40px VT323';

      let secondsPassed = 0;
      let oldTimestamp = 0;
      const game = new Game(canvas);

      const gameLoop = (animationFrame: number = 0) => {
        window.requestAnimationFrame(gameLoop);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        secondsPassed = (animationFrame - oldTimestamp) / 1000;
        oldTimestamp = animationFrame;

        game.update(secondsPassed);
        game.draw(ctx);
      };

      gameLoop();
    } else {
      console.error("Game Error: Couldn't find canvas")
    }
  }, []);

  return (
    <canvas id="game-canvas"></canvas>
  );
}
