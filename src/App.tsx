import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Game } from "./components/Game";
import { GameOver } from "./components/GameOver";
import { StartScreen } from "./components/StartScreen";

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

function App() {
  const [screen, setScreen] = useState<"start" | "game" | "gameOver">("start");
  const [result, setResult] = useState<"WIN" | "LOSE" | null>(null);

  function unreachableCase(_: never) {
    return <StartScreen goToGame={() => setScreen("game")} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {(function () {
        switch (screen) {
          case "start":
            return <StartScreen goToGame={() => setScreen("game")} />;

          case "game":
            return (
              <Game
                goToGameOver={(winOrLose: "WIN" | "LOSE") => {
                  setScreen("gameOver");
                  setResult(winOrLose);
                }}
              />
            );

          case "gameOver":
            return (
              <GameOver
                result={result!}
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

export default App;
