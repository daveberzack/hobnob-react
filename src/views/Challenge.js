import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "../components/Scores";
import Card from "../components/Card";
import Timer from "../components/Timer";

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
            <button onClick={()=>{handleGuess(true);}}>
              <img className="icon" src="/img/button/right.png" alt="Right"/>
              <h3>Right</h3>
            </button>
            <button onClick={()=>{handleGuess(false);}}>
              <img className="icon" src="/img/button/wrong.png" alt="Wrong"/>
              <h3>Wrong</h3>
            </button>
          </div>
        </div>
        </div>
      </div>
    );
}