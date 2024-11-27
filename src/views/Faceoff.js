import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import Scores from "../components/Scores";

export default function Faceoff() {

  const { currentCardForFaceoff, currentTurnPlayer, handleFaceoffGuess } = useContext(GameContext);
    
    if (currentCardForFaceoff==-1) {
      return (
        <div className="page current-player-bg" id="faceoff-page">
          <Scores/>

          <div class="content-holder">
          <div class="content-box">
              <div className="title">
                <h2>Face-Off</h2>
                <p>Tie Breaker Round!</p>
              </div>
              <img className="card placeholder" src={"./characters/c1.png"}  />
              <div className="button-bar">
                <button onClick={()=>{handleFaceoffGuess(true);}}><img className="icon" src={"./next.png"} /></button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="page current-player-bg" id="faceoff-page">
          <Scores/>

          <div class="content-holder">
          <div class="content-box">
              <div className="title">
                <h2>Player {currentTurnPlayer+1}</h2>
                <p>Who is this?</p>
              </div>
              <img className="card current-player-bg" src={"./characters/c"+currentCardForFaceoff+".png"} />
              <div className="button-bar"h>
                <button onClick={()=>{handleFaceoffGuess(true);}}><img className="icon" src={"./right.png"} /></button>
                <button onClick={()=>{handleFaceoffGuess(false);}}><img className="icon" src={"./wrong.png"} /></button>
              </div>
            </div>
          </div>
        </div>
      );
    }
}