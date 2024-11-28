import { useContext, useState } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "../components/Scores";
import Card from "../components/Card";

export default function Faceoff() {

  const { currentCardForFaceoff, currentTurnPlayer, handleFaceoffGuess } = useContext(GameContext);
  
  const [showInstructions, setShowInstructions] = useState(true);

      return (
        <div className="page" id="faceoff-page">
          <Card id={currentCardForFaceoff}/>
          <Scores/>

          <div class="content-box current-player-bg">
            <div className="instructions">
                <h2>Player {currentTurnPlayer+1}</h2>
                <p>Who is this? Can you remember their name and fun fact?</p>
            </div>
            <div className="buttons">
              <button onClick={()=>{handleFaceoffGuess(true);}}>
                <img className="icon" src={"./img/button/right.png"} />
                <h3>Right</h3>
              </button>
              <button onClick={()=>{handleFaceoffGuess(false);}}>
                <img className="icon" src={"./img/button/wrong.png"} />
                <h3>Wrong</h3>
              </button>
            </div>
          </div>
          {
            (showInstructions) &&
            <div className="modal-overlay clickable-modal-overlay covering-modal-overlay">
              <div className="modal">
                It's a tie! Prepare for the face-off round!
                <button onClick={()=>{setShowInstructions(false);}}>
                <img className="icon" src={"./img/button/next.png"} />
                  <h3>Start</h3>
                </button>
              </div>
            </div>
          }
        </div>
      );
}