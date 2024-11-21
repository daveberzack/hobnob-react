export default function ScoreTab({player, score, isCurrent}) {
  
    const classes = isCurrent ? "score-tab is-current" : "score-tab";
    const dots = [];
    for (let i=0; i<score; i++) {
        dots.push(<div></div>);
    }
    return (
      <div className={classes}>
        <h3>{player}</h3>
        <div className="score-dots">
            {dots}
        </div>
      </div>
    );
}