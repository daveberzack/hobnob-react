export default function ScoreTab({player, score, isCurrent, onPlayerClick}) {
  
  let scoreImage = score;
  let  classes = "score-tab player-bg-"+player;
  if (isCurrent) classes += " is-current";

    return (
      <div className={classes} onClick={()=>{if (onPlayerClick) onPlayerClick(player)}}>
        <h3>{player+1}</h3>
        <div className="score">
            {Array.from({ length: score }, (_, index) => (
              <div key={index}></div>
            ))}
        </div>
      </div>
    );
}