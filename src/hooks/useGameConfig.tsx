import { EASY } from "const/constants";
import { GameContext } from "context/GameContext";
import { useContext } from "react";

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
  const TIMER_DURATION = difficulty === EASY ? 15 : 7;
  const hardTextStyle =
    difficulty === EASY ? notChoosedDifficultyStyles : choosedDifficultyStyles;
  const easyTextStyle =
    difficulty === EASY ? choosedDifficultyStyles : notChoosedDifficultyStyles;
  const difficultyIcon = difficulty === EASY ? "😌" : "😳";
  const ANSWERS_AFTER_X_STEP = difficulty === EASY ? 5 : 0;
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
