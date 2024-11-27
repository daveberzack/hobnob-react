import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "../components/Scores";
import Card from "../components/Card";

export default function Introduce() {

    const { currentTurnPlayer, currentCardToIntroduce, handleIntroduce } = useContext(GameContext);

    return (
      <div className="page" id="introduce-page">
        <Card id={currentCardToIntroduce}/>
        <Scores />
        <div className="content-box current-player-bg">
          <div className="instructions">
              <h2>Player {currentTurnPlayer+1}</h2>
              <p>Introduce this person with a name and one fun fact about them.</p>
          </div>
          <div className="buttons">
            <button className="placeholder"/>
            <button className="placeholder"/>
            <button onClick={handleIntroduce}>
              <img className="icon" src={"./img/button/next.png"} />
              <h3>Next</h3>
            </button>
          </div>
        </div>
      </div>
    );
}