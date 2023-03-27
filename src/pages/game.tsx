import { FunctionComponent, useEffect } from "react";
import { Game } from "../game";

export const GamePage: FunctionComponent = () => {
  useEffect(() => {
    const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
   
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (canvas != null) {
      const ctx = canvas.getContext("2d");

      if (ctx == null) {
        console.error("Game Error: Canvas 2D Context not found");
        return;
      }

      // Customize canvas context 
      ctx.font = '40px Verdana';
      
      const game = new Game(canvas);

      const gameLoop = () => {
        window.requestAnimationFrame(gameLoop);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        game.update();
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
