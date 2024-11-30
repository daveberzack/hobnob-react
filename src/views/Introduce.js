import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "../components/Scores";
import Card from "../components/Card";
import Button from "../components/Button";

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
            <Button isPlaceholder={true} />
            <Button isPlaceholder={true} />
            <Button label="Next" icon="next" onClick={handleIntroduce} />
          </div>
        </div>
      </div>
    );
}