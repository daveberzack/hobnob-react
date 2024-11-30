import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import Button from "../components/Button";
export default function About() {
  
  const { showHome } = useContext(GameContext);
    return (
      <div className="page" id="about-page">
        <h1>About</h1>
        <Button label="Home" onClick={showHome} />
      </div>
    );
}