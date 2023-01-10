import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "./App.css";
import { Game } from "./components/Game";
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
                goToGameOver={(winOrLose: "WIN" | "LOSE") =>
                  setScreen("gameOver")
                }
              />
            );

          case "gameOver":
            return <StartScreen goToGame={() => setScreen("game")} />;

          default:
            unreachableCase(screen);
        }
      })()}
    </QueryClientProvider>
  );
}

export default App;
