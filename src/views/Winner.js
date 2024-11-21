import { useContext } from "react";
import { GameContext } from "../utils/GameContext";

export default function Winner() {

  const { playerScores, showHome } = useContext(GameContext);
  
    let winner = -1;
    playerScores.forEach( (ps,i)=> {
      if (ps>0) winner=i;
    })

    return (
      <div className="page" id="winner-page">
        <h1>Winner</h1>
        Player {winner}
        <button onClick={showHome}>Home</button>
      </div>
    );
}