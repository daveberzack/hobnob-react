import { useContext, useEffect, useState } from "react";
import { GameContext } from "../utils/GameContext";
import "./Winner.css";
import Button from "../components/Button";

export default function Winner() {

    const { playerScores, showHome } = useContext(GameContext);

    const [victoryImageId, setVictoryImageId] = useState(1);

    useEffect( ()=> {
      setVictoryImageId( Math.ceil(Math.random()*15) );
    },[]);
  
    const winners = [];
    playerScores.forEach( (ps,i)=> {
      if (ps>0) {
        winners.push(i);
      }
    });

    let message1 = "Player "+(winners[0]+1);
    let message2 = "You are the winner!";
    let winnerColorIndex = winners[0];
    if (winners.length>1){
      message1 = "Players "+(winners[0]+1);
      for (let i=1; i<winners.length; i++) { 
        message1 +=" & "+(winners[i]+1);
      }
      message2 = "You are all winners!";
      winnerColorIndex=8;
    }
    if (winners.length===2){
      message2 = "You are both winners!"; 
    }

    return (
      <div className="page" id="winner-page">
      
        <div className="card">
          <img className={"player-border-"+winnerColorIndex} src={`${process.env.PUBLIC_URL}/img/victory/${victoryImageId}.jpg`} alt="Victory!"/>
        </div>
        
        <div className={"content-box player-bg-"+winnerColorIndex}>
          <h1>{message1}</h1>
          <h2>{message2}</h2>
          <Button label="Home" icon="home" onClick={showHome} />
        </div>
      </div>
    );
}


