import { Button, Col, Result, Row, Card } from "antd";

import GameText from "components/GameText";
import { SmileOutlined } from "@ant-design/icons";
import {
  BUBBLE_SORT,
  GAME_BAR,
  HEAP_SORT,
  IS_RENDERING,
  MERGE_SORT,
  QUICK_SORT,
  SWAP,
} from "const/constants";
import {
  BarInComparison,
  BarInSwap,
  nonActiveBar,
  optionStyle,
} from "const/styles";
import Bar from "components/Bar";
import { GameContext } from "PlayGround/GameContext";
import { GameBarTypes, MoveJournalType } from "PlayGround/types";
import { useCallback, useContext } from "react";
import { useEffect, useState } from "react";
import { bubbleSort, heapSort, mergeSort, quickSort } from "utils/sorting";
import { delay, generateRandomNumbers } from "utils/utils";
import styles from "PlayGround/styles.module.css";
import { useGameConfig } from "PlayGround/hooks/useGameConfig";

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
  } = useContext(GameContext);
  const { ANSWERS_AFTER_X_STEP, ANIMATION_DELAY, START_GAME_BUTTON_COLOR } =
    useGameConfig();

  useEffect(() => {
    const notVisibleOptions =
      options.filter((option) => !option.visible).length === options.length;
    if (isGameOn && notVisibleOptions) {
      const randomBars = generateRandomNumbers();
      const arr = randomBars.map((bar) => bar.value);
      const choosedSorting = options.find((option) => option.correct)?.sorting;
      const { array, moveJournal: updatedMoveJournal } = runSort(
        arr,
        choosedSorting
      );
      console.log({ array });
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
      case QUICK_SORT:
        return quickSort({
          array,
          low: 0,
          high: array.length - 1,
          moveJournal: [],
        });
      case BUBBLE_SORT:
        return bubbleSort(array);
      case HEAP_SORT:
        return heapSort(array);
      case MERGE_SORT:
        return mergeSort({
          array,
          left: 0,
          right: array.length - 1,
          moveJournal: [],
        });
      default:
        throw new Error("Invalid sorting name");
    }
  };

  const renderBoard = useCallback(() => {
    if (!isGameOn && score.lastGainedScore > 0) {
      return (
        <Card bordered={false}>
          <Result
            icon={<SmileOutlined />}
            title={`Your score is ${score.currentScore}. Your streak is ${score.streak}`}
            extra={
              <Button type="primary" onClick={() => restartGame()}>
                Restart game
              </Button>
            }
          />
        </Card>
      );
    }
    if (isGameOn) {
      return (
        <Col span={23} style={{ height: "80%" }}>
          <Row justify="center" style={{ height: "80%" }} align="bottom">
            {currentBars?.map((number, index) => (
              <Bar
                value={number.value}
                color={number.color}
                key={number.value}
              />
            ))}
          </Row>
        </Col>
      );
    }
    return (
      <Button
        onClick={() => startGame()}
        style={{
          ...optionStyle,
          minWidth: "0",
          width: 250,
          backgroundColor: START_GAME_BUTTON_COLOR,
        }}
      >
        <GameText
          styles={{ fontSize: "25px", color: "#fff", fontWeight: "bold" }}
        >
          Start the game
        </GameText>
      </Button>
    );
  }, [
    START_GAME_BUTTON_COLOR,
    currentBars,
    isGameOn,
    restartGame,
    score.currentScore,
    score.lastGainedScore,
    score.streak,
    startGame,
  ]);

  return (
    <Row
      align="middle"
      justify="center"
      className={styles["play-ground__body"]}
    >
      {renderBoard()}
    </Row>
  );
};

export default PlayGroundBody;
