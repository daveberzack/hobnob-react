import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import './Home.css';

export default function Home() {
  
    const { showOptions, showAbout } = useContext(GameContext);
    return (
      <div className="page" id="home-page">
        <img id="logo" src="./img/logo.jpg"/>
        <div className="home-buttons">
          <button variant="contained" onClick={showOptions}>Play</button>
          <button variant="contained" onClick={showAbout}>About</button>
        </div>
      </div>
    );
}