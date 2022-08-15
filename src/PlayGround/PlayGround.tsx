import PlayGroundBody from "PlayGround/PlayGroundBody";
import PlayGroundHeader from "PlayGround/PlayGroundHeader";
import { colFlex } from "const/styles";
import React, { useReducer, useState } from "react";
import PlayGroundOptions from "PlayGround/PlayGroundOptions";
import { getScore, shuffle } from "utils/utils";
import {
  MERGE_SORT,
  QUICK_SORT,
  SORTING_POOL,
  TIMER_KEY_ONE,
  TIMER_KEY_TWO,
} from "const/constants";
export type OptionsType = {
  sorting: string;
  correct: boolean;
  visible: boolean;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "increment":
      return { score: state.count + 1 };
    case "decrement":
      return { score: state.count - 1 };
    default:
      throw new Error();
  }
};
const intialState = {
  score: 0,
  timerKey: TIMER_KEY_ONE,
  isTimerTicking: false,
  isGameOn: false,
  options: [],
};
const PlayGround = () => {
  const [renderNextRound, setRenderNextRound] = useState<boolean>(false);

  const [options, setOptions] = useState<Array<OptionsType>>([]);
  const [isGameOn, setIsGameOn] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isTimerTicking, setIsTimerTicking] = useState<boolean>(false);
  const [timerKey, setTimerKey] = useState<React.Key>(TIMER_KEY_ONE);
  const [state, dispatch] = useReducer(reducer, intialState);
  const startGame = () => {
    if (!isGameOn) {
      setIsGameOn(true);
      setRenderNextRound(true);
      setTimerKey((prevKey) =>
        prevKey === TIMER_KEY_ONE ? TIMER_KEY_TWO : TIMER_KEY_ONE
      );
      setOptions(
        shuffle(
          SORTING_POOL.map((sort) => ({
            sorting: sort,
            correct: sort === MERGE_SORT ? true : false,
          }))
        )
      );
    }
  };

  const sortingRenderFinished = () => {
    setOptions((prev) =>
      prev.map((option) => ({
        ...option,
        visible: true,
      }))
    );
    setRenderNextRound(false);
    setIsTimerTicking(true);
  };
  const handleAnswer = (userGuess: string) => {
    setIsTimerTicking(false);
    const correctAnswer = options.find((option) => option.correct)?.sorting;
    if (correctAnswer === userGuess) {
      console.log({ correctAnswer });
      setTimerKey((prevKey) =>
        prevKey === TIMER_KEY_ONE ? TIMER_KEY_TWO : TIMER_KEY_ONE
      );
      setRenderNextRound(true);
      setScore((prevScore) => prevScore + getScore());
    } else {
      gameHasFinished();
    }
  };

  const gameHasFinished = () => {
    setIsGameOn(false);
    setOptions((prev) =>
      prev.map((option) => ({
        ...option,
        visible: false,
      }))
    );
    setScore(0);
    setRenderNextRound(false);
    setTimerKey((prevKey) =>
      prevKey === TIMER_KEY_ONE ? TIMER_KEY_TWO : TIMER_KEY_ONE
    );
  };
  return (
    <div
      style={{
        ...colFlex,
        width: "100%",
        paddingTop: 10,
        backgroundColor: "#fef5ff",
        height: "calc(100% - 120px)",
      }}
    >
      <PlayGroundHeader
        score={score}
        timerKey={timerKey}
        isTimerTicking={isTimerTicking}
        isGameOn={isGameOn}
        handleTimeOut={gameHasFinished}
      />
      <PlayGroundBody
        isGameOn={isGameOn}
        sortingRenderFinished={sortingRenderFinished}
        startGame={startGame}
        renderNextRound={renderNextRound}
        setRenderNextRound={setRenderNextRound}
        sortToUse={
          options?.length > 0
            ? options.find((option) => option.correct)?.sorting
            : undefined
        }
      />
      <PlayGroundOptions options={options} handleAnswer={handleAnswer} />
    </div>
  );
};

export default PlayGround;
