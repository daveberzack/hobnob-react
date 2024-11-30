import { useContext } from "react";
import { GameContext } from "../utils/GameContext";
import './Home.css';
import Button from "../components/Button";

export default function Home() {
  
    const { showOptions, showAbout } = useContext(GameContext);
    return (
      <div className="page" id="home-page">
        <img id="logo" src={`${process.env.PUBLIC_URL}/img/logo.jpg`} alt="Hobnob"/>
        <div className="home-buttons">
          <Button label="Play" onClick={showOptions} />
        </div>
      </div>
    );
}