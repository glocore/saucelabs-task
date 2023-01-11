import classes from "./StartScreen.module.css";
import billy from "../assets/billy.jpeg";

export type StartScreenProps = {
  goToGame: () => void;
};

export function StartScreen(props: StartScreenProps) {
  return (
    <div className={classes["start-screen"]}>
      <div className={classes.panel}>
        <img src={billy} className={classes.billy} />
        <span className={classes.invite}>Do you want to play a game?</span>
        <button onClick={() => props.goToGame()} className="button" autoFocus>
          Begin
        </button>
      </div>
    </div>
  );
}
