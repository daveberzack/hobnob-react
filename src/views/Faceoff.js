import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "../components/Scores";

export default function Faceoff() {

  const { currentCardForFaceoff, currentTurnPlayer, handleFaceoffGuess } = useContext(GameContext);
    
    if (currentCardForFaceoff==-1) {
      return (
        <div className="page" id="faceoff-page">
          <Scores/>
          <h1>Faceoff Start</h1>
          <button onClick={ ()=>{handleFaceoffGuess(true);}}>Start</button>
        </div>
      );
    }
    else {
      return (
        <div className="page" id="faceoff-page">
          <Scores/>
          <h1>Faceoff</h1>
          <div>Player {currentTurnPlayer}</div>
          <div>Card {currentCardForFaceoff}</div>
          <button onClick={ ()=>{handleFaceoffGuess(true);}}>Correct</button>
          <button onClick={ ()=>{handleFaceoffGuess(false);}}>Incorrect</button>
        </div>
      );
    }
}