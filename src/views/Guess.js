import { useContext, useState } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "../components/Scores";
import Card from "../components/Card";

export default function Guess() {

    const { currentTurnPlayer, playerScores, currentCardToGuess, handleGuess, handleChallenge } = useContext(GameContext);
    
    const [isSelectingPlayerForChallenge, setIsSelectingPlayerForChallenge] = useState(false);

    function handlePlayerClick(p){
      if (isSelectingPlayerForChallenge && p!=currentTurnPlayer) handleChallenge(p);
    }
    return (
      <div className="page" id="guess-page">
        
        <Card id={currentCardToGuess}/>
        <Scores onPlayerClick={handlePlayerClick}/>
        <div class="content-box current-player-bg">
          <div className="instructions">
              <h2>Player {currentTurnPlayer+1}</h2>
              <p>Who is this? Can you remember their name and fun fact?</p>
          </div>
          <div className="buttons">
            <button onClick={()=>{handleGuess(true);}}>
              <img className="icon" src={"./img/button/right.png"} />
              <h3>Right</h3>
            </button>
            <button onClick={()=>{handleGuess(false);}}>
              <img className="icon" src={"./img/button/wrong.png"} />
              <h3>Wrong</h3>
            </button>
            <button onClick={()=>{setIsSelectingPlayerForChallenge(true);}}>
              <img className="icon" src={"./img/button/next.png"} />
              <h3>Nudge</h3>
            </button>
          </div>
        </div>
        {
          isSelectingPlayerForChallenge &&
          <div className="modal-overlay">
            <div className="modal">
              Choose a player to nudge by tapping on their tab
            </div>
          </div>
        }
      </div>
    );
}