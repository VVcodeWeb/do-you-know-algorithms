import { ACTION, SORTING_POOL, QUICK_SORT } from "const/constants";
import { OptionsType } from "PlayGround";
import React, { useReducer } from "react";
import { delay, getScore, shuffle } from "utils/utils";

const intialState = {
  score: 0,
  timerKey: 1,
  isTimerTicking: false,
  isGameOn: false,
  options: [] as Array<OptionsType>,
  isSortingRendering: false,
};
type Action =
  | { type: typeof ACTION.START_GAME }
  | { type: typeof ACTION.STOP_RENDERING }
  | { type: typeof ACTION.DISPLAY_ANSWERS }
  | { type: typeof ACTION.STOP_GAME }
  | { type: typeof ACTION.MANAGE_RENDERING; payload: { isRendering: boolean } }
  | { type: typeof ACTION.NEW_ROUND; payload?: { scoreGained: number } };

type State = {
  isGameOn: boolean;
  score: number;
  timerKey: number;
  isTimerTicking: boolean;
  options: Array<OptionsType>;
  isSortingRendering: boolean;
};

const reducer = (state: State, action: Action): State | never => {
  switch (action.type) {
    case ACTION.NEW_ROUND:
      return {
        ...state,
        score: action.payload ? state.score + getScore() : state.score,
        isGameOn: true,
        timerKey: state.timerKey + 1,
        isTimerTicking: false,
        isSortingRendering: false,
        options: shuffle(
          SORTING_POOL.map((sort) => ({
            sorting: sort,
            correct: sort === QUICK_SORT ? true : false,
            visible: false,
          }))
        ),
      };
    case ACTION.DISPLAY_ANSWERS:
      return {
        ...state,
        isTimerTicking: true,
        options: state.options.map((option) => ({
          ...option,
          visible: true,
        })),
      };

    case ACTION.STOP_GAME:
      return intialState;
    case ACTION.MANAGE_RENDERING:
      return {
        ...state,
        isSortingRendering: action.payload.isRendering,
      };

    //deprecated
    case ACTION.START_GAME:
      return {
        ...state,
        score: 0,
        isGameOn: true,
      };

    default:
      throw new Error();
  }
};

export const GameContext = React.createContext({
  ...intialState,
  startGame: () => {},
  handleAnswer: (userGuess: string) => {},
  showAnswers: () => {},
  stopGame: () => {},
  nextRound: () => {},
  manageRendering: ({ isRendering }: { isRendering: boolean }) => {},
});

const GameProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const nextRound = () => dispatch({ type: ACTION.NEW_ROUND });
  const showAnswers = () => dispatch({ type: ACTION.DISPLAY_ANSWERS });
  const stopGame = () => dispatch({ type: ACTION.STOP_GAME });
  const manageRendering = ({ isRendering }: { isRendering: boolean }) =>
    dispatch({ type: ACTION.MANAGE_RENDERING, payload: { isRendering } });

  const handleAnswer = async (userGuess: string) => {
    if (state.isSortingRendering) {
      console.log("sorting is rendering at handleAnswer");
      await delay(1000);
    }
    console.log({ handleAnswerSortingState: state.isSortingRendering });
    const correctAnswer = state.options.find(
      (option) => option.correct
    )?.sorting;

    if (correctAnswer === userGuess)
      dispatch({
        type: ACTION.NEW_ROUND,
        payload: { scoreGained: getScore() },
      });
    else dispatch({ type: ACTION.STOP_GAME });
  };
  //deprecated
  const startGame = () => dispatch({ type: ACTION.NEW_ROUND });
  return (
    <GameContext.Provider
      value={{
        ...state,
        startGame,
        handleAnswer,
        showAnswers,
        stopGame,
        nextRound,
        manageRendering,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export default GameProvider;
