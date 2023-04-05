import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Backdrop } from "../game/backdrop";
import { TeamNumberModal } from "../components/team-number-modal";
import Logo from "../assets/logo.png";
import "./main-menu.scss";

export const MainMenuPage: FunctionComponent = () => {
  const [isTeamModalOpen, setIsTeamModal] = useState<boolean>(false);

  const navigate = useNavigate();

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

    ctx.imageSmoothingEnabled = false;

    let secondsPassed = 0;
    let oldTimestamp = 0;
    const backdrop = new Backdrop(canvas);

    const loop = (animationFrame: number = 0) => {
      window.requestAnimationFrame(loop);
      
      secondsPassed = (animationFrame - oldTimestamp) / 1000;
      oldTimestamp = animationFrame;

      backdrop.update(secondsPassed);
      backdrop.draw(ctx);
    }

    loop();
  }, []);

  const checkTeamAndContinue = () => {
    const teamNumber = localStorage.getItem("team_number");
    if (!teamNumber) {
      setIsTeamModal(true);
      return; 
    }
    navigate("/game");
  }

  return (
    <>
      <TeamNumberModal 
        isOpen={isTeamModalOpen} 
        close={() => setIsTeamModal(false)}
        onComplete={() => navigate("/game")}
      />
      <div className="main-page">
        <div className="main-page__title-group">
          <img src={Logo} className="main-page__charged-up-logo" />
          <h2 className="main-page__title">Blargle Charge</h2>
        </div>
        <button 
          className="main-page__play-button"
          onClick={checkTeamAndContinue}
        >
          Play
        </button>
      </div> 
      <canvas id="game-canvas"></canvas>
    </>
  );
}

