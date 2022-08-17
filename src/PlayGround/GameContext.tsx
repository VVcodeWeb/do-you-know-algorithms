import {
  ACTION,
  SORTING_POOL,
  QUICK_SORT,
  SHOULD_RENDER_STOP,
} from "const/constants";
import { State, Action, RenderStatesType, OptionsType } from "PlayGround/types";
import React, { useReducer, useState } from "react";
import { getScore, shuffle } from "utils/utils";

const intialState = {
  score: 0,
  timerKey: 0,
  isTimerTicking: false,
  isGameOn: false,
  options: [] as Array<OptionsType>,
  isRendering: false,
  shouldRenderStop: false,
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
    case ACTION.UPDATE_RENDERING_STATES:
      return {
        ...state,
        [action.payload.stateName]: action.payload.value,
      };
    case ACTION.STOP_GAME:
      return intialState;
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
  updateRenderingStates: ({
    value,
    stateName,
  }: {
    value: boolean;
    stateName: RenderStatesType;
  }) => {},
  renderStopped: () => {},
});

const GameProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  const [storedUserGuess, setStoredUserGuess] = useState("");
  const startGame = () => dispatch({ type: ACTION.NEW_ROUND });
  const showAnswers = () => dispatch({ type: ACTION.DISPLAY_ANSWERS });
  const stopGame = () => dispatch({ type: ACTION.STOP_GAME });
  const renderStopped = () => handleAnswer(storedUserGuess);

  const updateRenderingStates = ({
    value,
    stateName,
  }: {
    value: boolean;
    stateName: RenderStatesType;
  }) =>
    dispatch({
      type: ACTION.UPDATE_RENDERING_STATES,
      payload: { value, stateName },
    });

  const handleAnswer = async (userGuess: string) => {
    if (state.isRendering) {
      setStoredUserGuess(userGuess);
      updateRenderingStates({ stateName: SHOULD_RENDER_STOP, value: true });
      return;
    } else {
      setStoredUserGuess("");
      updateRenderingStates({ stateName: SHOULD_RENDER_STOP, value: false });
    }
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
  return (
    <GameContext.Provider
      value={{
        ...state,
        startGame,
        handleAnswer,
        showAnswers,
        stopGame,
        updateRenderingStates,
        renderStopped,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export default GameProvider;
