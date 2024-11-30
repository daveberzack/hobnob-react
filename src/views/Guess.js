import { useContext, useState } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "../components/Scores";
import Card from "../components/Card";
import Timer from "../components/Timer";

export default function Guess() {

    const { currentTurnPlayer, currentCardToGuess, handleGuess, handleChallenge, setModalData, modals } = useContext(GameContext);
    
    const [isSelectingPlayerForChallenge, setIsSelectingPlayerForChallenge] = useState(false);

    function handleNudge(){
      setModalData(modals.CHALLENGE_SELECT);
      setIsSelectingPlayerForChallenge(true);
    }

    function handlePlayerClick(p){
      if (isSelectingPlayerForChallenge && p!==currentTurnPlayer) {
        setModalData(null);
        handleChallenge(p);
      }
    }

    return (
      <div className="page" id="guess-page">
        
        <Card id={currentCardToGuess}/>
        <Scores onPlayerClick={handlePlayerClick}/>
        <div className="content-box current-player-bg">
          <div className="instructions">
              <h2>Player {currentTurnPlayer+1}</h2>
              <p>Who is this? Can you remember their name and fun fact?</p>
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
            <button onClick={handleNudge}>
              <img className="icon" src="/img/button/next.png" alt="Nudge"/>
              <h3>Nudge</h3>
            </button>
          </div>
        </div>
      </div>
    );
}