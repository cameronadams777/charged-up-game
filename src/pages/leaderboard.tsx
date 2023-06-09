import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Backdrop } from "../game/backdrop";
import { client } from "../lib/supabase";
import "./leaderboard.scss";

export const LeaderboardPage: FunctionComponent = () => {
  const [leaderboardData, setLeaderboardData] = useState<any>([]);
  const effectCalled = useRef(false);

  useEffect(() => {
    if(effectCalled.current) return;
    effectCalled.current = true;

    const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
    if (canvas == null) {
      console.error("Game Error: Canvas not defined");
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
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      secondsPassed = (animationFrame - oldTimestamp) / 1000;
      oldTimestamp = animationFrame;

      backdrop.update(secondsPassed);
      backdrop.draw(ctx);
    }
   
    const teamNumber = localStorage.getItem("team_number");
    const sessionId = localStorage.getItem("session_id");
    const charge = localStorage.getItem("charge");
    
    const submitCharge = async () => {
      await client
        .from("leaderboard")
        .insert({ 
          team_number: teamNumber, 
          session_id: sessionId,
          charge,
        });

      localStorage.removeItem("charge");
    }

    const fetchLeaderboardData = async () => {
      const { data, error } = await client
        .from("leaderboard")
        .select()
        .order("charge", { ascending: false })
        .limit(5)
      if (error) {
        window.location.href = "/500";
        return;
      }
      setLeaderboardData(data);
    }

    loop();

    if (charge?.length) {
      submitCharge()
        .then(async () => {
          await fetchLeaderboardData()
        });
      return;
    }

    fetchLeaderboardData();
  }, []);

  return (
    <>
      <div className="leaderboard-page">
        <div className="leaderboard-page__menu">
          <h3 className="leaderboard-page__menu-title">Leaderboard</h3>
          { 
            leaderboardData.map((listing: any, index: number) => (
              <div key={index} className="leaderboard-page__menu-item">
                <span>{index + 1}: {listing.team_number} - {listing.charge}</span>
              </div>
            ))
          }
        </div>
        <Link
          to="/game"
          className="leaderboard-page__play-again-button"
        >
          Play Again
        </Link>
      </div>
      <canvas id="game-canvas"></canvas>
    </>
  );
}
