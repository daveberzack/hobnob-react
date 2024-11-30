
import "./Timer.css";
import { GameContext } from "../utils/GameContext";
import { useContext } from "react";

export default function Timer() {

    const { timer } = useContext(GameContext);

    const widthPercent = Math.round(timer*10000)/100; //percent from 0-100

    return (
      <div className="timer">
        <div className="timer-bar" style={{ width: widthPercent+'%' }}/>
      </div>
    );
}