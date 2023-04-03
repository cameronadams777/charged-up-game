import { FunctionComponent, useEffect } from "react";
import { GameManager } from "../game/manager";


export const GamePage: FunctionComponent = () => {
  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
    if(!canvas) throw new Error("Game Error: No canvas element detected");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const manager = new GameManager(canvas);
    manager.start();
  }, []);

  return (
    <canvas id="game-canvas"></canvas>
  );
}
