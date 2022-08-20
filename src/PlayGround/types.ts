import {
  ACTION,
  COMPARISON,
  EASY,
  HARD,
  IS_RENDERING,
  SHOULD_RENDER_STOP,
  SWAP,
} from "const/constants";

export type Action =
  | { type: typeof ACTION.DISPLAY_ANSWERS }
  | { type: typeof ACTION.END_GAME }
  | {
      type: typeof ACTION.UPDATE_RENDERING_STATES;
      payload: {
        value: boolean;
        stateName: RenderStatesType;
      };
    }
  | {
      type: typeof ACTION.SET_DIFFICULTY;
      payload: { difficulty: DifficultyType };
    }
  | { type: typeof ACTION.RESET_GAME_PARAMS }
  | { type: typeof ACTION.NEW_ROUND; payload?: { scoreGained: number } };

export type State = {
  isGameOn: boolean;
  score: {
    currentScore: number;
    lastGainedScore: number;
    streak: number;
  };
  timerKey: number;
  isTimerTicking: boolean;
  options: Array<OptionsType>;
  isRendering: boolean;
  shouldRenderStop: boolean;
  difficulty: DifficultyType;
};
export type OptionsType = {
  sorting: string;
  correct: boolean;
  visible: boolean;
};
export type MoveJournalType = {
  indexOne: number;
  indexTwo: number;
  indexThree?: number;
  action: typeof COMPARISON | typeof SWAP;
  step: number;
  rendered: boolean;
};
export type GameBarTypes = {
  value: number;
  id: string | number;
  color: string;
};
export type DifficultyType = typeof HARD | typeof EASY;
export type RenderStatesType = typeof IS_RENDERING | typeof SHOULD_RENDER_STOP;
