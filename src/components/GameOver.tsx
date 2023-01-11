import classes from "./GameOver.module.css";
import billy from "../assets/billy.jpeg";

type GameOverProps = {
  result: "WIN" | "LOSE";
  score: number;
  goToGame: () => void;
};

export function GameOver(props: GameOverProps) {
  return (
    <div className={classes["game-over"]}>
      <div className={classes.panel}>
        <img src={billy} className={classes.billy} />
        <span className={classes.message}>GAME OVER</span>
        <span className={classes.result}>
          {props.result === "WIN" ? "You win." : "You lose."}
          <br />
          Final Score: {props.score}
        </span>

        <button onClick={() => props.goToGame()} className="button" autoFocus>
          Play again
        </button>
      </div>
    </div>
  );
}
