import { useContext, useState } from "react";
import { GameContext } from "../utils/GameContext";
import './Options.css';
import Button from "../components/Button";

export default function Options() {

  
    const cardNumberInfo = [
      {},{},{},{},{},{}, //skip 1-5
      {before:3, time:"5-10", challenge:"Intro"}, //6
      {before:4, time:"5-10", challenge:"Intro"},
      {before:5, time:"5-10", challenge:"Low"},
      {before:5, time:"10-15", challenge:"Low"},
      {before:6, time:"10-15", challenge:"Modest"}, //10
      {before:6, time:"10-15", challenge:"Modest"},
      {before:7, time:"15-20", challenge:"Medium"}, 
      {before:7, time:"15-20", challenge:"Medium"},
      {before:8, time:"15-20", challenge:"Medium"}, 
      {before:8, time:"20-25", challenge:"Medium"}, //15
      {before:9, time:"20-25", challenge:"Tough"},
      {before:9, time:"20-25", challenge:"Tough"}, 
      {before:10, time:"25-30", challenge:"Tough"},
      {before:11, time:"25-30", challenge:"Brutal"},
      {before:12, time:"25-30", challenge:"Brutal"}, //20
      {before:12, time:"25-30", challenge:"Brutal"}
    ]

    const { startGame } = useContext(GameContext);
  
    const [numberOfPlayers, setNumberOfPlayers] = useState(5);
    const [numberOfCards, setNumberOfCards] = useState(13);

    function handleClickStart(){
      const numberOfCardsBeforeGuessing = cardNumberInfo[numberOfCards].before-1; //-1 is adjusting for edge case miscalculation, which I should fix
      startGame(numberOfPlayers, numberOfCards, numberOfCardsBeforeGuessing);
    }
    
    const playerOptions = [1,2,3,4,5,6,7,8,9];
    const cardOptions = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
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
              <div className="card-select-block">
                <div className="card-select">
                  {
                    cardOptions.map( (p) => {
                      let classes = "";
                      if (numberOfCards < p) classes += " dimmed";
                      return <div key={"p"+p} className={classes} onClick={ ()=>{setNumberOfCards(p)} }>{p}</div>
                    })
                  }
                </div>
                <div className="card-select-description">
                  <div>
                    <h3>Difficulty:</h3>
                    <h2>{cardNumberInfo[numberOfCards].challenge}</h2>
                  </div>
                  <div>
                    <h3>Play Time:</h3>
                    <h2>{cardNumberInfo[numberOfCards].time} min</h2>
                  </div>
                </div>
              </div>
          </div>
          <div className="option">
            <Button label="Start" onClick={handleClickStart} />
          </div>
        </div>
      </div>
    );
}