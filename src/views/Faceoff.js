import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "../components/Scores";
import Card from "../components/Card";
import Timer from "../components/Timer";

export default function Faceoff() {

  const { currentCardForFaceoff, currentTurnPlayer, handleFaceoffGuess } = useContext(GameContext);

      return (
        <div className="page" id="faceoff-page">
          <Card id={currentCardForFaceoff}/>
          <Scores/>

          <div className="content-box current-player-bg">
            <div className="instructions">
                <h2>Player {currentTurnPlayer+1}</h2>
                <p>Can you remember their name and fun fact?</p>
                <Timer/>
            </div>
            <div className="buttons">
              <button onClick={()=>{handleFaceoffGuess(true);}}>
                <img className="icon" src="/img/button/right.png" alt="Right"/>
                <h3>Right</h3>
              </button>
              <button onClick={()=>{handleFaceoffGuess(false);}}>
                <img className="icon" src="/img/button/wrong.png" alt="Wrong"/>
                <h3>Wrong</h3>
              </button>
            </div>
          </div>
        </div>
      );
}