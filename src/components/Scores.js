import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import ScoreTab from "./ScoreTab";
export default function Scores() {
  
  const { playerScores, currentTurnPlayer} = useContext(GameContext);
    return (
      <div className="scores">
        {
          playerScores.map( (score, i )=>{
            return <ScoreTab player={i} score={score} isCurrent={i==currentTurnPlayer} />
          })
        }
      </div>
    );
}