import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import ScoreTab from "./ScoreTab";
import "./Scores.css";
export default function Scores({onPlayerClick}) {
  
  const { playerScores, currentTurnPlayer, isFaceoff, cardsRemaining } = useContext(GameContext);

    let classes = "scores";
    if (playerScores.length>5) classes += " condensed-scores";
    if (isFaceoff) classes += " faceoff"; 

    return (
      <div className={classes}>
        <div className="score-tabs">
          {
            playerScores.map( (score, i )=>{
              return <ScoreTab key={"p"+i} player={i} score={score} isCurrent={currentTurnPlayer==i} onPlayerClick={onPlayerClick} />
            })
          }
        </div>
        
        <div className="score-count">
          <div className="deck"><div className="deck-inner">{cardsRemaining}</div></div>
        </div>
      </div>
    );
}