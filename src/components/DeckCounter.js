import "./DeckCounter.css";
import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
  

export default function DeckCounter() {
  
    const { cardsRemaining, setModalData, modals } = useContext(GameContext);

        function handleClick(){
            setModalData(modals.DECK_COUNTER);
        }

        return (
            <div className="score-count" onClick={handleClick}>
            <div className="deck"><div className="deck-inner">{cardsRemaining}</div></div>
            </div>
        );
  }