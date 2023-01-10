import "./StartScreen.css";
import billy from "../assets/billy.jpeg";

export type StartScreenProps = {
  goToGame: () => void;
};

export function StartScreen(props: StartScreenProps) {
  return (
    <div className="start-screen">
      <div className="panel">
        <img src={billy} className="billy" />
        <span className="invite">Do you want to play a game?</span>
        <button onClick={() => props.goToGame()} className="button">
          Begin
        </button>
      </div>
    </div>
  );
}
