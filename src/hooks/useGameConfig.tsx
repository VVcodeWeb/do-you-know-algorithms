import { COOKIE_BEST_STREAK, EASY } from "const/constants";
import { GameContext } from "context/GameContext";
import { useContext, useEffect, useState } from "react";
import { getCookie } from "utils/utils";

export const useGameConfig = () => {
  const { difficulty } = useContext(GameContext);
  const choosedDifficultyStyles = {
    color: difficulty === EASY ? "green" : "#CE3226",
    fontSize: 25,
  };
  const notChoosedDifficultyStyles = {
    color: "grey",
    fontSize: 15,
  };
  const TIMER_DURATION = difficulty === EASY ? 20 : 10;
  const hardTextStyle =
    difficulty === EASY ? notChoosedDifficultyStyles : choosedDifficultyStyles;
  const easyTextStyle =
    difficulty === EASY ? choosedDifficultyStyles : notChoosedDifficultyStyles;
  const difficultyIcon = difficulty === EASY ? "😌" : "😳";
  const ANSWERS_AFTER_X_STEP = difficulty === EASY ? 6 : 3;
  const ANIMATION_DELAY = difficulty === EASY ? 150 : 50;
  const START_GAME_BUTTON_COLOR = difficulty === EASY ? "green" : "#CE3226";

  return {
    TIMER_DURATION,
    hardTextStyle,
    easyTextStyle,
    difficultyIcon,
    ANSWERS_AFTER_X_STEP,
    ANIMATION_DELAY,
    START_GAME_BUTTON_COLOR,
  };
};