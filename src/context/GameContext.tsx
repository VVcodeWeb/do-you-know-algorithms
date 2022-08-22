import {
  ACTION,
  SORTING_POOL,
  SHOULD_RENDER_STOP,
  HEAP_SORT,
  QUICK_SORT,
  BUBBLE_SORT,
  MERGE_SORT,
  EASY,
  SELECTION_SORT,
} from "const/constants";
import {
  State,
  Action,
  RenderStatesType,
  OptionsType,
  DifficultyType,
} from "PlayGround/types";
import React, { useReducer, useState } from "react";
import { getScore, randomNumber, shuffle } from "utils/utils";

const intialState = {
  score: {
    currentScore: 0,
    lastGainedScore: 0,
    streak: 0,
  },
  timerKey: 0,
  isTimerTicking: false,
  isGameOn: false,
  options: [] as Array<OptionsType>,
  isRendering: false,
  shouldRenderStop: false,
  difficulty: EASY as DifficultyType,
};
const getColor = (sort: string) => {
  switch (sort) {
    case QUICK_SORT:
      return "#324851";
    //return "#26DFD0";
    case MERGE_SORT:
      return "#86ac41";
    //return "#B8EE30";
    case BUBBLE_SORT:
      return "#34675c";
    //return "#F62AA0";
    case HEAP_SORT:
      return "#7da3a1";
    //return "#F9D030";
    case SELECTION_SORT:
      return "#6CA2EA";
    //return "#F9D030";
    default:
      throw new Error("Invalid sort name");
  }
};
const generateOptions = (): OptionsType[] => {
  const options = [];
  const sortingPool = SORTING_POOL.slice();
  let rndIdx;
  while (options.length < 4) {
    rndIdx = randomNumber(0, sortingPool.length - 1);
    options.push({
      sorting: sortingPool[rndIdx],
      correct: options.length < 1,
      visible: false,
      color: getColor(sortingPool[rndIdx]),
    });
    sortingPool.splice(rndIdx, 1);
  }
  console.log({ options });
  return shuffle(options);
};
const reducer = (state: State, action: Action): State | never => {
  switch (action.type) {
    case ACTION.NEW_ROUND:
      const scoreGained = action?.payload?.scoreGained ?? 0;
      return {
        ...state,
        score: {
          currentScore: state.score.currentScore + scoreGained,
          lastGainedScore: scoreGained,
          streak: scoreGained > 0 ? state.score.streak + 1 : state.score.streak,
        },
        isGameOn: true,
        timerKey: state.timerKey + 1,
        isTimerTicking: false,
        options: generateOptions(),
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
    case ACTION.RESET_GAME_PARAMS:
      return {
        ...intialState,
        timerKey: state.timerKey + 1,
        score: {
          currentScore: 0,
          lastGainedScore: -1 * state.score.currentScore,
          streak: 0,
        },
        difficulty: state.difficulty,
      };
    case ACTION.END_GAME:
      return {
        ...state,
        options: intialState.options,
        isGameOn: false,
        isTimerTicking: false,
      };
    case ACTION.SET_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload.difficulty,
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
  updateRenderingStates: ({
    value,
    stateName,
  }: {
    value: boolean;
    stateName: RenderStatesType;
  }) => {},
  renderStopped: () => {},
  chooseDifficulty: (difficulty: DifficultyType) => {},
  restartGame: () => {},
});

const GameProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  const [storedUserGuess, setStoredUserGuess] = useState("");

  const startGame = () => dispatch({ type: ACTION.NEW_ROUND });
  const showAnswers = () => dispatch({ type: ACTION.DISPLAY_ANSWERS });
  const stopGame = () => dispatch({ type: ACTION.END_GAME });
  const renderStopped = () => handleAnswer(storedUserGuess);
  const restartGame = () => {
    dispatch({ type: ACTION.RESET_GAME_PARAMS });
    dispatch({ type: ACTION.NEW_ROUND });
  };
  const chooseDifficulty = (difficulty: DifficultyType) => {
    if (difficulty !== state.difficulty)
      dispatch({ type: ACTION.SET_DIFFICULTY, payload: { difficulty } });
  };
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
    else dispatch({ type: ACTION.END_GAME });
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
        chooseDifficulty,
        restartGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export default GameProvider;
