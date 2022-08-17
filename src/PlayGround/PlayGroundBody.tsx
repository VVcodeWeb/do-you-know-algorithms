import { Button, Col, Row } from "antd";
import GameText from "components/GameText";
import { getColor } from "components/Option";
import {
  BarInComparison,
  BarInSwap,
  nonActiveBar,
  optionStyle,
} from "const/styles";
import Bar from "PlayGround/Bar";
import { GameContext } from "PlayGround/GameContext";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { quickSort } from "utils/sorting";
import { delay, generateRandomNumbers, getRandomNumber } from "utils/utils";

export type MoveJournalType = {
  indexOne: number;
  indexTwo: number;
  action: "comparison" | "swap";
  step: number;
  rendered: boolean;
};
export type GameBarTypes = {
  value: number;
  id: string | number;
  color: string;
};
type PlayGroundBodyType = {
  isGameOn: boolean;
  sortingRenderFinished: () => void;
  startGame: () => void;
  renderNextRound: boolean;
  setRenderNextRound: React.Dispatch<React.SetStateAction<boolean>>;
  sortToUse: string | undefined;
};
const PlayGroundBody = () => {
  const [currentBars, setCurrentBars] = useState<GameBarTypes[]>([]);
  const [moveJournal, setMoveJournal] = useState<MoveJournalType[]>([]);
  const {
    isGameOn,
    showAnswers,
    startGame,
    options,
    isSortingRendering,
    manageRendering,
  } = useContext(GameContext);

  useEffect(() => {
    const notVisibleOptions =
      options.filter((option) => !option.visible).length === options.length;
    if (isGameOn && notVisibleOptions) {
      const randomBars = generateRandomNumbers();
      const arr = randomBars.map((bar) => bar.value);
      const { moveJournal: updatedMoveJournal } = quickSort({
        array: arr,
        low: 0,
        high: randomBars.length - 1,
        moveJournal: [],
      });
      //console.log({ arr });
      setCurrentBars(randomBars);
      setMoveJournal(updatedMoveJournal);
    }
  }, [options, isGameOn]);

  const renderNextMove = async (move: MoveJournalType) => {
    manageRendering({ isRendering: true });
    //console.log({ move });
    const gameBars = document.getElementsByClassName(
      "game-bar"
    ) as HTMLCollectionOf<HTMLElement>;
    const color = move.action === "swap" ? BarInSwap : BarInComparison;
    await delay(150);
    gameBars[move.indexOne].style.backgroundColor = color;
    gameBars[move.indexTwo].style.backgroundColor = color;
    await delay(150);
    if (move.action === "swap") {
      const tempHeight = gameBars[move.indexOne].style.height;
      gameBars[move.indexOne].style.height =
        gameBars[move.indexTwo].style.height;
      gameBars[move.indexTwo].style.height = tempHeight;
    }
    gameBars[move.indexOne].style.backgroundColor = nonActiveBar;
    gameBars[move.indexTwo].style.backgroundColor = nonActiveBar;
    console.log({ isSortingRenderingAfter: isSortingRendering });
    if (move.step === 10) showAnswers();
    if (!isSortingRendering && move.step + 1 < moveJournal.length)
      renderNextMove(moveJournal[move.step + 1]);
  };

  useEffect(() => {
    if (moveJournal.length > 0 && !moveJournal[0].rendered) {
      renderNextMove(moveJournal[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveJournal]);

  return (
    <Row
      align="middle"
      justify="center"
      style={{
        minHeight: "460px",
        width: "100%",
        backgroundColor: "#47D3EF",
        borderTop: "3px solid #47afff",
        borderBottom: "3px solid #47afff",
      }}
    >
      {isGameOn ? (
        <Col span={23} style={{ height: "80%" }}>
          <Row
            justify="center"
            style={{ height: "80%" }}
            align="bottom"
            className="game-bars"
          >
            {currentBars?.map((number, index) => (
              <Bar
                value={number.value}
                color={number.color}
                key={number.value}
              />
            ))}
          </Row>
        </Col>
      ) : (
        <Button
          onClick={() => startGame()}
          style={{
            ...optionStyle,
            minWidth: "0",
            width: 250,
            ...getColor(getRandomNumber(0, 3)),
          }}
        >
          <GameText
            styles={{ fontSize: "25px", color: "#fff", fontWeight: "bold" }}
          >
            Start the game
          </GameText>
        </Button>
      )}
    </Row>
  );
};

export default PlayGroundBody;
