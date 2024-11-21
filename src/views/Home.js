import { useContext } from "react";
import { GameContext } from "../utils/GameContext";

export default function Home() {
  
    const { showOptions, showAbout } = useContext(GameContext);
    return (
      <div className="page" id="home-page">
        <h1>Home</h1>
        <button variant="contained" onClick={showOptions}>Play</button>
        {/* <button variant="contained" onClick={showAbout}>About</button> */}
      </div>
    );
}