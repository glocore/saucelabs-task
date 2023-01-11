import { test, expect } from "vitest";
import { checkAnswer } from "./Game";
import crypto from "node:crypto";

Object.defineProperty(window, "crypto", {
  value: crypto,
  writable: true,
});

Object.defineProperty(global, "crypto", {
  value: crypto,
  writable: true,
});

test("checkAnswer works", async () => {
  const answer = "damascus";
  const correctHash = "dbc2c7d5fd33773edb2b0ae5e34a043ff2b4d974";
  const wrongHash = "041eda785a00ae87bd33fba77711c6b6ea9ea41e";

  const checkCorrect = await checkAnswer(answer, correctHash);
  const checkWrong = await checkAnswer(answer, wrongHash);

  expect(checkCorrect).toBe(true);
  expect(checkWrong).toBe(false);
});
