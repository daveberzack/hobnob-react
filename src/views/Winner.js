import { useContext } from "react";
import { GameContext } from "../utils/GameContext";

export default function Winner() {

  const {  } = useContext(GameContext);
  
    return (
      <div className="page" id="winner-page">
        <h1>Winner</h1>
      </div>
    );
}