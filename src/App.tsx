import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import classes from "./App.module.css";
import { Game } from "./components/Game";
import { GameOver } from "./components/GameOver";
import { StartScreen } from "./components/StartScreen";
import { ThemePicker } from "./components/ThemePicker";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export default function App() {
  const [screen, setScreen] = useState<"start" | "game" | "gameOver">("start");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<"WIN" | "LOSE" | null>(null);

  function unreachableCase(_: never) {
    return <StartScreen goToGame={() => setScreen("game")} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className={classes.header}>
        <ThemePicker />
      </div>
      {(function () {
        switch (screen) {
          case "start":
            return <StartScreen goToGame={() => setScreen("game")} />;

          case "game":
            return (
              <Game
                goToGameOver={(
                  winOrLose: "WIN" | "LOSE",
                  finalScore: number
                ) => {
                  setScreen("gameOver");
                  setResult(winOrLose);
                  setScore(finalScore);
                }}
              />
            );

          case "gameOver":
            return (
              <GameOver
                result={result!}
                score={score}
                goToGame={() => {
                  setScreen("game");
                  setResult(null);
                }}
              />
            );

          default:
            unreachableCase(screen);
        }
      })()}
    </QueryClientProvider>
  );
}
