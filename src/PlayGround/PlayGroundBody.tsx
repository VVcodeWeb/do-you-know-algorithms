import { useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Grid,
} from "@mui/material";

import {
  BUBBLE_SORT,
  GAME_BAR,
  HEAP_SORT,
  IS_RENDERING,
  MAX_NUMBERS,
  MERGE_SORT,
  QUICK_SORT,
  SELECTION_SORT,
  SWAP,
} from "const/constants";
import { BarInComparison, BarInSwap, nonActiveBar } from "const/styles";
import Bar from "components/Bar";
import { GameContext } from "context/GameContext";
import { GameBarTypes, MoveJournalType } from "PlayGround/types";
import {
  bubbleSort,
  heapSort,
  mergeSort,
  quickSort,
  selectionSort,
} from "utils/sorting";
import { delay, generateRandomNumbers } from "utils/utils";
import styles from "PlayGround/styles.module.css";
import { useGameConfig } from "hooks/useGameConfig";
import { flex } from "PlayGround/PlayGroundHeader";
import GameText from "components/GameText";
import PlayGroundOptions from "PlayGround/PlayGroundOptions";

const PlayGroundBody = () => {
  const [currentBars, setCurrentBars] = useState<GameBarTypes[]>([]);
  const [moveJournal, setMoveJournal] = useState<MoveJournalType[]>([]);

  const {
    isGameOn,
    showAnswers,
    options,
    startGame,
    updateRenderingStates,
    shouldRenderStop,
    renderStopped,
    score,
    restartGame,
    timerKey,
  } = useContext(GameContext);
  const { ANSWERS_AFTER_X_STEP, ANIMATION_DELAY } = useGameConfig();

  useEffect(() => {
    const notVisibleOptions =
      options.filter((option) => !option.visible).length === options.length;
    if (isGameOn && notVisibleOptions) {
      const randomBars = generateRandomNumbers();
      const arr = randomBars.map((bar) => bar.value);
      const choosedSorting = options.find((option) => option.correct)?.sorting;
      const { moveJournal: updatedMoveJournal } = runSort(arr, choosedSorting);
      setCurrentBars(randomBars);
      setMoveJournal(updatedMoveJournal);
    }
  }, [options, isGameOn]);

  /* TODO: heap sort renders wrong sometimes */
  useEffect(() => {
    (async function renderNextMove() {
      const nextMove = moveJournal.find((x) => !x.rendered);
      if (nextMove && !shouldRenderStop) {
        updateRenderingStates({ stateName: IS_RENDERING, value: true });
        const gameBars = document.getElementsByClassName(
          GAME_BAR
        ) as HTMLCollectionOf<HTMLElement>;
        const color = nextMove.action === SWAP ? BarInSwap : BarInComparison;
        gameBars[nextMove.indexOne].style.backgroundColor = color;
        gameBars[nextMove.indexTwo].style.backgroundColor = color;
        if (nextMove.indexThree)
          gameBars[nextMove.indexThree].style.backgroundColor = color;

        if (nextMove.action === SWAP) {
          const tempHeight = gameBars[nextMove.indexOne].style.height;
          gameBars[nextMove.indexOne].style.height =
            gameBars[nextMove.indexTwo].style.height;
          gameBars[nextMove.indexTwo].style.height = tempHeight;
        }
        await delay(ANIMATION_DELAY);
        gameBars[nextMove.indexOne].style.backgroundColor = nonActiveBar;
        gameBars[nextMove.indexTwo].style.backgroundColor = nonActiveBar;
        if (nextMove.indexThree)
          gameBars[nextMove.indexThree].style.backgroundColor = nonActiveBar;
        updateRenderingStates({ stateName: IS_RENDERING, value: false });
        if (nextMove.step === ANSWERS_AFTER_X_STEP) showAnswers();
        setMoveJournal((prevState) =>
          prevState.map((move) => {
            if (move.step === nextMove.step) move.rendered = true;
            return move;
          })
        );
      }
      if (shouldRenderStop) renderStopped();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveJournal]);
  const runSort = (array: number[], chosedSorting: string | undefined) => {
    switch (chosedSorting) {
      case BUBBLE_SORT:
        return bubbleSort(array);
      case HEAP_SORT:
        return heapSort(array);
      case SELECTION_SORT:
        return selectionSort(array);
      case MERGE_SORT:
        return mergeSort({
          array,
          left: 0,
          right: array.length - 1,
          moveJournal: [],
        });
      case QUICK_SORT:
        return quickSort({
          array,
          low: 0,
          high: array.length - 1,
          moveJournal: [],
        });
      default:
        throw new Error("Invalid sorting name");
    }
  };

  const endGameBoard = (
    <Card
      elevation={5}
      className={styles["restart_game"]}
      sx={{ minWidth: 345, height: "auto" }}
    >
      <div
        style={{
          ...flex,
          justifyContent: "space-between",
          flexDirection: "column",
          fontSize: "18px",
        }}
      >
        <CardHeader title={<GameText>Wrong answer</GameText>} />
        <CardContent>
          <p>Your score is {score.currentScore}</p>
          <p>Your streak is {score.streak}</p>
        </CardContent>
        <CardActions style={{ ...flex }}>
          <Button
            style={{ padding: 10, minWidth: 140 }}
            onClick={() => restartGame()}
            variant="outlined"
          >
            <GameText>Play again</GameText>
          </Button>
        </CardActions>
      </div>
    </Card>
  );

  const playGameButtonBoard = (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-end"
      style={{ boxSizing: "border-box" }}
      columns={MAX_NUMBERS}
    >
      <Button
        variant="outlined"
        onClick={() => startGame()}
        style={{ color: "white", padding: 10, minWidth: 140 }}
      >
        <GameText styles={{ fontSize: 18, fontWeight: "bold" }}>Play</GameText>
      </Button>
    </Grid>
  );

  const liveGameBoard = (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-end"
      style={{ boxSizing: "border-box" }}
      columns={MAX_NUMBERS}
    >
      {currentBars?.map((number, index) => (
        <Bar value={number.value} color={number.color} key={number.value} />
      ))}
    </Grid>
  );

  const rendernBoard = () => {
    if (!isGameOn && timerKey > 0) return endGameBoard;
    if (isGameOn) return liveGameBoard;
    return playGameButtonBoard;
  };
  return (
    <Grid
      container
      alignItems="middle"
      justifyContent="center"
      spacing={2}
      className={styles["play-ground__body"]}
    >
      <Grid item style={{ boxSizing: "border-box" }}>
        {rendernBoard()}
      </Grid>
      <Grid item>
        <PlayGroundOptions />
      </Grid>
    </Grid>
  );
};

export default PlayGroundBody;
