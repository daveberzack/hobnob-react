import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "../components/Scores";
export default function Challenge() {
  
  const { currentGuessingPlayer, currentCardToGuess, handleGuess } = useContext(GameContext);
  
    return (
      <div className="page" id="challenge-page">
        <Scores/>
        <h1>Challenge</h1><div>Player {currentGuessingPlayer}</div>
        <div>Card {currentCardToGuess}</div>
        <button onClick={ ()=>{handleGuess(true);} }>Correct</button>
        <button onClick={ ()=>{handleGuess(false);} }>Incorrect</button>
      </div>
    );
}