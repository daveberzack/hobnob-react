import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import ScoreTab from "./ScoreTab";
import "./Scores.css";
export default function Scores({onPlayerClick}) {
  
  const { playerScores, currentTurnPlayer, isFaceoff } = useContext(GameContext);

    let classes = "scores";
    if (playerScores.length>5) classes += " condensed-scores";
    if (isFaceoff) classes += " faceoff"; 

    return (
      <div className={classes}>
        {
          playerScores.map( (score, i )=>{
            return <ScoreTab player={i} score={score} isCurrent={currentTurnPlayer==i} onPlayerClick={onPlayerClick} />
          })
        }
      </div>
    );
}