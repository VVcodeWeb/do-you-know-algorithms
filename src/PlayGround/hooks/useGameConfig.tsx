import { EASY } from "const/constants";
import { GameContext } from "PlayGround/GameContext";
import { useContext } from "react";
const choosedDifficultyStyles = {
  color: "green",
  fontSize: 25,
};
const notChoosedDifficultyStyles = {
  color: "grey",
  fontSize: 15,
};
export const useGameConfig = () => {
  const { difficulty } = useContext(GameContext);
  const TIMER_DURATION = difficulty === EASY ? 20 : 10;
  const hardTextStyle =
    difficulty === EASY ? notChoosedDifficultyStyles : choosedDifficultyStyles;
  const easyTextStyle =
    difficulty === EASY ? choosedDifficultyStyles : notChoosedDifficultyStyles;
  const difficultyIcon = difficulty === EASY ? "😌" : "😳";
  const ANSWERS_AFTER_X_STEP = difficulty === EASY ? 6 : 3;
  const ANIMATION_DELAY = difficulty === EASY ? 150 : 50;
  const START_GAME_BUTTON_COLOR = difficulty === EASY ? "green" : "red";
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
