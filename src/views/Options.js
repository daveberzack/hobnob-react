import { useContext, useState } from "react";
import { GameContext } from "../utils/GameContext";

export default function Options() {

    const { startGame } = useContext(GameContext);
  
    const [numberOfPlayers, setNumberOfPlayers] = useState(3);
    const [numberOfCardsBeforeGuessing, setNumberOfCardsBeforeGuessing] = useState(5);
    const [numberOfCards, setNumberOfCards] = useState(8);

    function handleClickStart(){
      startGame(numberOfPlayers, numberOfCards, numberOfCardsBeforeGuessing);
    }
    
    return (
      <div className="page" id="options-page">
        <h1>Options</h1>
        <div>
            <label>Players:</label>
            <input
              type="text"
              value={numberOfPlayers}
              onChange={(e) => setNumberOfPlayers(e.target.value)}
            />
        </div>
        <div>
            <label>Cards before Guessing:</label>
            <input
              type="text"
              value={numberOfCardsBeforeGuessing}
              onChange={(e) => setNumberOfCardsBeforeGuessing(e.target.value)}
            />
        </div>
        <div>
            <label>Cards Total:</label>
            <input
              type="text"
              value={numberOfCards}
              onChange={(e) => setNumberOfCards(e.target.value)}
            />
        </div>
        <button onClick={handleClickStart}>Start</button>
      </div>
    );
}