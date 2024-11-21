import { useContext, useState } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "../components/Scores";

export default function Guess() {

    const { currentTurnPlayer, playerScores, currentCardToGuess, handleGuess, handleChallenge } = useContext(GameContext);
    
    const [isChallengeModalShown, setIsChallengeModalShown] = useState(false);

    function handleChallengeClick(){
      setIsChallengeModalShown(true);
    }

    function handlePlayerClick(player){
      handleChallenge(player);
    }
    return (
      <div className="page" id="guess-page">
        <Scores/>
        <h1>Guess</h1>
        <div>Player {currentTurnPlayer}</div>
        <div>Card {currentCardToGuess}</div>
        <button onClick={ ()=>{handleGuess(true);}}>Correct</button>
        <button onClick={ ()=>{handleGuess(false);}}>Incorrect</button>
        <button onClick={ ()=>{handleChallengeClick();}}>Challenge</button>
        {
          isChallengeModalShown &&
          <div>
            {
              playerScores.map( (p, i) => {
                if (i!=currentTurnPlayer) {
                  return <button key={i} onClick={ ()=>handlePlayerClick(i) }>{i}</button>
                }
              })
            }
          </div>
        }
      </div>
    );
}