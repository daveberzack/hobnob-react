import { useContext, useState } from "react";
import { GameContext } from "../utils/GameContext";
import './Options.css';

export default function Options() {

    const { startGame } = useContext(GameContext);
  
    const [numberOfPlayers, setNumberOfPlayers] = useState(5);
    const [numberOfCardsBeforeGuessing, setNumberOfCardsBeforeGuessing] = useState(6);
    const [numberOfCardsAfterGuessing, setNumberOfCardsAfterGuessing] = useState(6);

    function handleClickStart(){
      startGame(numberOfPlayers, numberOfCardsBeforeGuessing+numberOfCardsAfterGuessing, numberOfCardsBeforeGuessing);
    }
    
    const playerOptions = [1,2,3,4,5,6,7,8,9];
    const cardOptions = [4,5,6,7,8,9,10,11,12];
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
                    return <div className={classes} onClick={ ()=>{setNumberOfPlayers(p)} }>{p}</div>
                  })
                }
              </div>
          </div>
          <div className="option">
              <label>How many characters will we introduce before we start seeing them again?</label>
              <div className="card-select">
                {
                  cardOptions.map( (p) => {
                    let classes = "";
                    if (numberOfCardsBeforeGuessing < p) classes += " dimmed";
                    return <div className={classes} onClick={ ()=>{setNumberOfCardsBeforeGuessing(p)} }>{p}</div>
                  })
                }
              </div>
          </div>
          <div className="option">
              <label>How many more characters will we introduce after we've started seeing them return?</label>
              <div className="card-select">
                {
                  cardOptions.map( (p) => {
                    let classes = "";
                    if (numberOfCardsAfterGuessing < p) classes += " dimmed";
                    return <div className={classes} onClick={ ()=>{setNumberOfCardsAfterGuessing(p)} }>{p}</div>
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