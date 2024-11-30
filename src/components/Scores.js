import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import ScoreTab from "./ScoreTab";
import "./Scores.css";
import DeckCounter from "./DeckCounter";
export default function Scores({onPlayerClick}) {
  
  const { playerScores, currentTurnPlayer, phase } = useContext(GameContext);

    let classes = "scores";
    if (playerScores.length>4) classes += " condensed-scores";
    if (Math.max(...playerScores)>4) classes += " wrapped-scores";
    if (phase==4) classes += " faceoff"; 

    return (
      <div className={classes}>
        <div className="score-tabs">
          {
            playerScores.map( (score, i )=>{
              return <ScoreTab key={"p"+i} player={i} score={score} isCurrent={currentTurnPlayer===i} onPlayerClick={onPlayerClick} />
            })
          }
        </div>
        <DeckCounter/>
      </div>
    );
}