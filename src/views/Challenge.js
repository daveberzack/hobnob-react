import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "../components/Scores";
import Card from "../components/Card";
import Timer from "../components/Timer";
import Button from "../components/Button";

export default function Challenge() {
  
  const { currentGuessingPlayer, currentCardToGuess, handleGuess } = useContext(GameContext);
  
    return (
      <div className="page" id="challenge-page">
        <Card id={currentCardToGuess}/>
        <Scores />


        <div className="content-box current-player-bg">
        <div className={"challenge-instructions-inner player-bg-"+currentGuessingPlayer}>
          <div className="instructions">
              <h2>Player {currentGuessingPlayer+1}</h2>
              <p>Can you remember their name and fun fact?</p>
              <Timer/>
          </div>
          <div className="buttons">
            <Button label="Right" icon="right" onClick={()=>{handleGuess(true);}} />
            <Button label="Wrong" icon="wrong" onClick={()=>{handleGuess(false);}} />
          </div>
        </div>
        </div>
      </div>
    );
}