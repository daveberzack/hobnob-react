import { useContext } from "react";
import { GameContext } from "../utils/GameContext";

export default function Faceoff() {

  const { } = useContext(GameContext);
    return (
      <div className="page" id="faceoff-page">
        <h1>Faceoff</h1>
      </div>
    );
}