import PlayGroundBody from "PlayGround/PlayGroundBody";
import PlayGroundHeader from "PlayGround/PlayGroundHeader";
import { colFlex } from "const/styles";
import React, { useEffect, useState } from "react";
import PlayGroundOptions from "PlayGround/PlayGroundOptions";
import { getScore, shuffle } from "utils/utils";
import {
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
const PlayGround = () => {
  const [isGameOn, setIsGameOn] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [renderNextRound, setRenderNextRound] = useState<boolean>(false);
  const [isTimerTicking, setIsTimerTicking] = useState<boolean>(false);
  const [timerKey, setTimerKey] = useState<React.Key>(TIMER_KEY_ONE);
  const [options, setOptions] = useState<Array<OptionsType>>([]);

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
            correct: sort === QUICK_SORT ? true : false,
          }))
        )
      );
    }
  };
  useEffect(() => {
    console.log({ options });
  }, [options]);

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
      setOptions((prev) =>
        shuffle(
          prev.map((option) => ({
            ...option,
            visible: false,
          }))
        )
      );
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
        startGame={startGame}
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
