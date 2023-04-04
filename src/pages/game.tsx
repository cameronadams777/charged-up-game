import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Game } from "../game";
import gameSound from "../assets/audio/game-music.mp3";

const audioContext = new AudioContext();

export const GamePage: FunctionComponent = () => {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement>();
  const effectCalled = useRef(false);

  useEffect(() => {
    if(effectCalled.current) return;
    effectCalled.current = true;

    const audioElement = document.querySelector<HTMLAudioElement>("audio");
    if(audioElement != null) {
      setAudioElement(audioElement);
      const track = audioContext.createMediaElementSource(audioElement);
      track.connect(audioContext.destination);
    }
    
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

  const toggleGameMusic = (ev: any) => {
    // Check if context is in suspended state (autoplay policy)
    if (!audioContext || !audioElement) return;
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    // Play or pause track depending on state
    if (ev.target.dataset.playing === "false") {
      audioElement.play();
      ev.target.dataset.playing = "true";
    } else if (ev.target.dataset.playing === "true") {
      audioElement.pause();
      ev.target.dataset.playing = "false";
    }
  } 

  return (
    <>
      <button 
        className="music-button"
        data-playing="false" 
        role="switch" 
        aria-checked="false"
        onClick={(ev) => toggleGameMusic(ev)}
      >
        Music
      </button>
      <canvas id="game-canvas"></canvas>
      <audio src={gameSound}></audio>
    </>
  );
}
