import { useContext, useState } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "../components/Scores";
import Card from "../components/Card";
import Timer from "../components/Timer";
import Button from "../components/Button";

export default function Guess() {

    const { currentTurnPlayer, currentCardToGuess, handleGuess, handleChallenge, setModalData, modals } = useContext(GameContext);
    
    const [isSelectingPlayerForChallenge, setIsSelectingPlayerForChallenge] = useState(false);

    function handleNudge(){
      setModalData(modals.CHALLENGE_SELECT);
      setIsSelectingPlayerForChallenge(true);
    }
    function handleGuessClick(isCorrect){
      if (!isSelectingPlayerForChallenge) handleGuess(isCorrect);
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
              <p>Can you recall their name and fun fact?</p>
              <Timer/>
          </div>
          <div className="buttons">
            <Button label="Right" icon="right" onClick={()=>{handleGuessClick(true);}} />
            <Button label="Wrong" icon="wrong" onClick={()=>{handleGuessClick(false);}} />
            <Button label="Nudge" icon="next" onClick={handleNudge} />
          </div>
        </div>
      </div>
    );
}