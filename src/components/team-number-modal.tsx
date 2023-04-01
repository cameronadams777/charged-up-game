import { FunctionComponent, useState } from "react";
import ReactModal from "react-modal";
import { v4 as uuid } from "uuid";

interface TeamNumberProps {
  isOpen: boolean;
  close: () => void;
  onComplete: () => void;
}

export const TeamNumberModal: FunctionComponent<TeamNumberProps> = (props) => {
  const [teamNumber, setTeamNumber] = useState<number>(0);
  const { onComplete, ...rest } = props;
  
  const saveTeamNumberAndSession = () => {
    const teamNumString = teamNumber.toString();
    if(teamNumString.length > 4) return;
    const sessionId = uuid();
    localStorage.setItem("team_number", teamNumString);
    localStorage.setItem("session_id", sessionId);
    onComplete();
  }

  return (
    <ReactModal
      overlayClassName="modal-overlay"
      {...rest}
    >
      <div className="team-number-modal">
        <button 
          className="team-number-modal__close-button"
          onClick={props.close}
        >
          X
        </button>
        <input 
          id="team-number" 
          aria-label="team number" 
          type="number"
          value={teamNumber} 
          className="team-number__team-input"
          onInput={(event) => setTeamNumber(parseInt((event.target as HTMLInputElement).value, 10))} 
        />
        <button 
          className="team-number__submit-button"
          onClick={saveTeamNumberAndSession}
        >
          Submit
        </button>
      </div>
    </ReactModal>
  );
}
