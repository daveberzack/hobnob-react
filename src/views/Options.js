import { useContext, useState } from "react";
import { GameContext } from "../utils/GameContext";
import './Options.css';

export default function Options() {

    const { startGame } = useContext(GameContext);
  
    const [numberOfPlayers, setNumberOfPlayers] = useState(5);
    const [numberOfCards, setNumberOfCards] = useState(6);

    function handleClickStart(){
      const cardConfigArray = [0,0,0,0,0,0, 3,4,5,5,6, 6,7,7,8,8, 9,9,10,11,12];
      const numberOfCardsBeforeGuessing = cardConfigArray[numberOfCards]-1; //-1 is adjusting for edge case miscalculation, which I should fix
      startGame(numberOfPlayers, numberOfCards, numberOfCardsBeforeGuessing);
    }
    
    const playerOptions = [1,2,3,4,5,6,7,8,9];
    const cardOptions = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    return (
      <div className="page" id="options-page">
        <div className="options-content">
          <div className="option">
              <label>How many people are playing?</label>
              <div className="player-select">
                {
                  playerOptions.map( (p) => {
                    let classes = "player-bg-"+(p-1);
                    if (numberOfPlayers < p) classes += " dimmed";
                    return <div key={"p"+p} className={classes} onClick={ ()=>{setNumberOfPlayers(p)} }>{p}</div>
                  })
                }
              </div>
          </div>
          <div className="option">
              <label>How many characters will we introduce?</label>
              <div className="card-select">
                {
                  cardOptions.map( (p) => {
                    let classes = "";
                    if (numberOfCards < p) classes += " dimmed";
                    return <div key={"p"+p} className={classes} onClick={ ()=>{setNumberOfCards(p)} }>{p}</div>
                  })
                }
              </div>
          </div>
          <div className="option">
          <button onClick={handleClickStart}>Start</button>
          </div>
        </div>
      </div>
    );
}