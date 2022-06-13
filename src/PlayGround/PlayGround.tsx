import PlayGroundBody from "PlayGround/PlayGroundBody";
import PlayGroundHeader from "PlayGround/PlayGroundHeader";
import { colFlex } from "const/styles";
import React, { useState } from "react";
import PlayGroundOptions from "PlayGround/PlayGroundOptions";
import { getScore } from "utils/utils";
import { TIMER_KEY_ONE, TIMER_KEY_TWO } from "const/constants";

const PlayGround = () => {
  const [isGameOn, setIsGameOn] = useState<boolean>(false);
  const [areOptionsVisible, setAreOptionsVisible] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [renderNextRound, setRenderNextRound] = useState<boolean>(false);
  const [timerKey, setTimerKey] = useState<React.Key>(TIMER_KEY_ONE);
  const startGame = () => {
    if (!isGameOn) setIsGameOn(true);
    setRenderNextRound(true);
    setTimerKey((prevKey) =>
      prevKey === TIMER_KEY_ONE ? TIMER_KEY_TWO : TIMER_KEY_ONE
    );
  };

  const sortingRenderFinished = () => {
    setAreOptionsVisible(true);
    setRenderNextRound(false);
  };
  const handleAnswer = () => {
    if (true) {
      setTimerKey((prevKey) =>
        prevKey === TIMER_KEY_ONE ? TIMER_KEY_TWO : TIMER_KEY_ONE
      );
      setRenderNextRound(true);
      setAreOptionsVisible(false);
      setScore((prevScore) => prevScore + getScore());
    }
  };

  const handleTimeOut = () => {
    /* setIsGameOn(false);
    setAreOptionsVisible(false);
    setRenderNextRound(false);*/
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
        isGameOn={isGameOn}
        handleTimeOut={handleTimeOut}
      />
      <PlayGroundBody
        isGameOn={isGameOn}
        sortingRenderFinished={sortingRenderFinished}
        startGame={startGame}
        renderNextRound={renderNextRound}
        setRenderNextRound={setRenderNextRound}
      />
      <PlayGroundOptions
        areOptionsVisible={areOptionsVisible}
        handleAnswer={handleAnswer}
      />
    </div>
  );
};

export default PlayGround;
