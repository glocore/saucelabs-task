import classes from "./GameOver.module.css";

type GameOverProps = {
  result: "WIN" | "LOSE";
  goToGame: () => void;
};

export function GameOver(props: GameOverProps) {
  return (
    <div className={classes["game-over"]}>
      <div className={classes.panel}>
        <span className={classes.message}>GAME OVER</span>
        <span className={classes.result}>
          {props.result === "WIN" ? "You win." : "You lose."}
        </span>

        <button onClick={() => props.goToGame()} className="button">
          Play again
        </button>
      </div>
    </div>
  );
}
