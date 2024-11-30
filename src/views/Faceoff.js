import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "../components/Scores";
import Card from "../components/Card";
import Timer from "../components/Timer";
import Button from "../components/Button";

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
              <Button label="Right" icon="right" onClick={()=>{handleFaceoffGuess(true);}} />
              <Button label="Wrong" icon="wrong" onClick={()=>{handleFaceoffGuess(false);}} />
            </div>
          </div>
        </div>
      );
}