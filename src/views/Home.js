import { useContext } from "react";
import { GameContext } from "../utils/GameContext";

export default function Home() {
  
    const { showOptions, showAbout } = useContext(GameContext);
    return (
      <div className="page" id="home-page">
        <h1>Home</h1>
        <button onClick={showOptions}>Play</button>
        <button onClick={showAbout}>About</button>
      </div>
    );
}