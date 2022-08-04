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
import React from "react";
import { useEffect, useState } from "react";
import { mergeSort, quickSort } from "utils/sorting";
import { generateRandomNumbers, getRandomNumber } from "utils/utils";
import CSS from "csstype";
import { getValue } from "@testing-library/user-event/dist/utils";

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
const PlayGroundBody = ({
  isGameOn,
  sortingRenderFinished,
  startGame,
  renderNextRound,
  setRenderNextRound,
}: PlayGroundBodyType) => {
  const [currentBars, setCurrentBars] = useState<GameBarTypes[]>([]);
  const [moveJournal, setMoveJournal] = useState<MoveJournalType[]>([]);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    if (renderNextRound) {
      /* Sort numbers with some delay, store every move in moveJournal */
      const sortNumbers = async () => {
        const randomNumbers = generateRandomNumbers();
        setCurrentBars(randomNumbers);
        await delay(1000);
        if (randomNumbers.length > 0) {
          const { moveJournal: updatedMoveJournal } = quickSort({
            array: randomNumbers.map((number) => number.value),
            low: 0,
            high: randomNumbers.length - 1,
            moveJournal: [],
          });
          setMoveJournal(updatedMoveJournal);
        }
      };
      sortNumbers();
    }
  }, [renderNextRound]);

  useEffect(() => {
    if (moveJournal.length > 0 && !moveJournal[0].rendered) {
      const renderMoves = async () => {
        for (let move of moveJournal) {
          console.log({ move });
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
          if (move.step > 10) {
            sortingRenderFinished();
          }
        }
      };
      renderMoves();
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
