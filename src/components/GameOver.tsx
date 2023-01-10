import "./GameOver.css";

type GameOverProps = {
  result: "WIN" | "LOSE";
  goToGame: () => void;
};

export function GameOver(props: GameOverProps) {
  return (
    <div className="game-over">
      <div className="panel">
        <span className="message">GAME OVER</span>
        <span className="result">
          {props.result === "WIN" ? "You win." : "You lose."}
        </span>

        <button onClick={() => props.goToGame()} className="button">
          Play again
        </button>
      </div>
    </div>
  );
}
