import { useContext } from "react";
import { GameContext } from "../utils/GameContext";

export default function About() {
  
  const { showHome } = useContext(GameContext);
    return (
      <div className="page" id="about-page">
        <h1>About</h1>
        <button onClick={showHome}>Home</button>
      </div>
    );
}