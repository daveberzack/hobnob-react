import { useContext } from "react";
import { GameContext } from "../utils/GameContext";

export default function Scores() {
  
  const { playerScores, currentTurnPlayer} = useContext(GameContext);
    return (
      <div className="page" id="about-page">
        {
          playerScores.map( (score, i )=>{
            if (i==currentTurnPlayer) return "["+i+":"+score+"] ... "
            else return i+":"+score+" ... "
          })
        }
      </div>
    );
}