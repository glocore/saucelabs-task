import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import classes from "./Game.module.css";
import billy from "../assets/billy.jpeg";

type GameProps = {
  goToGameOver: (winOrLose: "WIN" | "LOSE") => void;
};

export function Game(props: GameProps) {
  const [questions, setQuestions] = useState<Question[]>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [toast, setToast] = useState<Toast | null>(null);

  function clearInput() {
    setToast(null);
    setAnswer("");
  }

  const { refetch, isLoading, isError } = useQuery(
    ["questions"],
    getQuestions,
    {
      onSuccess: (data) => {
        if (!data) return;

        if (!questions) {
          setQuestions(data);
          return;
        }

        const newQuestions = data.filter((question) => {
          return !questions.some((q) => q.answerSha1 === question.answerSha1);
        });

        if (!newQuestions.length) return props.goToGameOver("WIN");

        setQuestions((questions) => [...questions!, ...newQuestions]);
        setCurrentQuestionIndex((i) => i + 1);
        clearInput();
      },
    }
  );

  const currentQuestion = questions?.[currentQuestionIndex];

  function nextQuestion() {
    const didExhaustQuestions = currentQuestionIndex === questions!.length - 1;

    setTimeout(() => {
      if (didExhaustQuestions) refetch();
      else {
        setCurrentQuestionIndex((i) => i + 1);
        clearInput();
      }
    }, 2000);
  }

  function handleCorrectAnswer() {
    setToast({
      type: "correct",
      message: "Correct!",
    });
    setScore(score + 1);

    nextQuestion();
  }

  function handleWrongAnswer() {
    setToast({
      type: "wrong",
      message: "Wrong!",
    });

    const newMistakes = mistakes + 1;

    if (newMistakes >= 3) {
      props.goToGameOver("LOSE");
      return;
    }

    setMistakes(newMistakes);
    nextQuestion();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isCorrect = await checkAnswer(answer, currentQuestion!.answerSha1);

    if (isCorrect) handleCorrectAnswer();
    else handleWrongAnswer();
  }

  return (
    <div className={classes.game}>
      <div className={classes.frame}>
        {isLoading ? (
          <div className={classes.loading}>
            <img src={billy} className={classes["loading-image"]} />
          </div>
        ) : isError ? (
          <div className={classes.loading}>
            Something's wrong. Check your connection and reload the page.
          </div>
        ) : (
          <div className={classes["game-ui"]}>
            <div className={classes.score}>
              <div>Score: {score}</div>
              <div>Lives: {3 - mistakes}</div>
            </div>
            {currentQuestion ? (
              <div className={classes.question}>
                <div className={classes["question-text"]}>
                  {currentQuestion.question}
                </div>
                <form onSubmit={handleSubmit} className={classes.response}>
                  <input
                    placeholder="Answer"
                    name="answer"
                    onChange={(e) => setAnswer(e.target.value)}
                    value={answer}
                    disabled={!!toast}
                    autoFocus
                  />
                  <input
                    type="submit"
                    value="Submit"
                    disabled={!answer || !!toast}
                    className={`button ${classes.submit}`}
                  />
                </form>
              </div>
            ) : (
              <div />
            )}
            {
              <div
                className={`${classes.toast} ${
                  classes[`toast-${toast?.type}`]
                }`}
              >
                {toast?.message ?? "\u00a0" /* nbsp */}
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}

async function getQuestions() {
  const response = await fetch("https://eok9ha49itquif.m.pipedream.net");

  if (!response.ok) throw Error("REQUEST_FAILED");

  const data = await response.json();

  return data.questions as Question[];
}

async function checkAnswer(answer: string, answerSha1: string) {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(answer.toLowerCase());
  const digest = await crypto.subtle.digest("SHA-1", buffer);
  const hashArray = Array.from(new Uint8Array(digest));
  const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hash === answerSha1;
}

type Question = {
  answerSha1: string;
  question: string;
};

type Toast = {
  type: "correct" | "wrong";
  message: string;
};
