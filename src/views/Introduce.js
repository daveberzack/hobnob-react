import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "./Scores";

export default function Introduce() {

    const { currentTurnPlayer, currentCardToIntroduce, handleIntroduce } = useContext(GameContext);

    return (
      <div className="page" id="introduce-page">
        <Scores />
        <h1>Introduce</h1>
        <div>Player {currentTurnPlayer}</div>
        <div>Card {currentCardToIntroduce}</div>
        <button onClick={handleIntroduce}>Done</button>
      </div>
    );
}