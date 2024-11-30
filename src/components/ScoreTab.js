export default function ScoreTab({player, score, isCurrent, onPlayerClick}) {
  
  let scoreImage = score;
  let  classes = "score-tab player-bg-"+player;
  if (isCurrent) classes += " is-current";
  if (score<0) {
    classes += " is-out";
    scoreImage = "x";
  }
    const dots = [];
    for (let i=0; i<score; i++) {
        dots.push(<div></div>);
    }

    return (
      <div className={classes} onClick={()=>{if (onPlayerClick) onPlayerClick(player)}}>
        <h3>{player+1}</h3>
        <div className="score">
          <img src={`${process.env.PUBLIC_URL}/img/score/${scoreImage}.gif`} alt={`${scoreImage} points`}/>
        </div>
      </div>
    );
}