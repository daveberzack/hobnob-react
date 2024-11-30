import { useContext } from "react";
import Home from "./views/Home";
import About from "./views/About";
import Options from "./views/Options";
import Introduce from "./views/Introduce";
import Guess from "./views/Guess";
import Challenge from "./views/Challenge";
import Faceoff from "./views/Faceoff";
import Winner from "./views/Winner";
import Modal from "./components/Modal";

import './App.css';
import { GameContext } from "./utils/GameContext";

function App() {

  const { currentView, views, currentTurnPlayer } = useContext(GameContext);

  const cv = currentView;
  return (
    <div id="app" className={"current-player-"+currentTurnPlayer}>
      {cv===views.HOME && <Home />}
      {cv===views.ABOUT && <About />}
      {cv===views.OPTIONS && <Options />}
      {cv===views.INTRODUCE && <Introduce />}
      {cv===views.GUESS && <Guess />}
      {cv===views.CHALLENGE && <Challenge />}
      {cv===views.FACEOFF && <Faceoff />}
      {cv===views.WINNER && <Winner />}
      <Modal />
    </div>
  );
}

export default App;
