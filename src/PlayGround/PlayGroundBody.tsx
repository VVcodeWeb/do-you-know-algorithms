import { Button, Col, Row } from "antd";
import GameNumber, { GameNumberTypes } from "components/GameNumber";
import React from "react";
import { useEffect, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { quickSort } from "utils/sorting";
import { generateRandomNumbers } from "utils/utils";
export type MoveJournalType = {
  swapIndexOne: number;
  swapIndexTwo: number;
  step: number;
  rendered: boolean;
};

type PlayGroundBodyType = {
  isGameOn: boolean;
  sortingRenderFinished: () => void;
  startGame: () => void;
  renderNextRound: boolean;
  setRenderNextRound: React.Dispatch<React.SetStateAction<boolean>>;
};
const PlayGroundBody = ({
  isGameOn,
  sortingRenderFinished,
  startGame,
  renderNextRound,
  setRenderNextRound,
}: PlayGroundBodyType) => {
  const [currentNumbers, setCurrentNumbers] = useState<GameNumberTypes[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [moveJournal, setMoveJournal] = useState<MoveJournalType[]>([]);

  /* Sort numbers with some delay, store every move in moveJournal */
  useEffect(() => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    const sortNumbers = async () => {
      await delay(1500);
      if (!isSorted && currentNumbers.length > 0) {
        const { moveJournal: updatedMoveJournal } = quickSort(
          currentNumbers.map((number) => number.value),
          0,
          currentNumbers.length - 1,
          []
        );
        setMoveJournal(updatedMoveJournal);
        setIsSorted(true);
      }
    };
    if (currentNumbers) sortNumbers();
  }, [currentNumbers, isSorted]);

  useEffect(() => {
    if (renderNextRound) {
      setCurrentNumbers(generateRandomNumbers());
      setIsSorted(false);
    }
  }, [renderNextRound]);

  useEffect(() => {
    if (moveJournal.length > 0) {
      if (!moveJournal[0].rendered) renderNextMove();
      if (moveJournal[moveJournal.length - 1].rendered) sortingRenderFinished();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveJournal]);

  const renderNextMove = () => {
    const notRenderedMove = moveJournal.findIndex((move) => !move.rendered);
    if (notRenderedMove >= 0) {
      setCurrentNumbers((prevState) => {
        let numbers = [...prevState];
        const index1 = moveJournal[notRenderedMove].swapIndexOne;
        const index2 = moveJournal[notRenderedMove].swapIndexTwo;
        const temp = numbers[index1];
        numbers[index1] = numbers[index2];
        numbers[index2] = temp;
        return numbers;
      });
      setMoveJournal((prevState) =>
        prevState.map((move, index) => {
          if (index === notRenderedMove) move.rendered = true;
          return move;
        })
      );
    }
  };

  return (
    <Row
      align="middle"
      justify="center"
      style={{
        minHeight: "400px",
        width: "100%",
        backgroundColor: "#47D3EF",
      }}
    >
      {isGameOn ? (
        <Col span={20}>
          <Flipper
            flipKey={currentNumbers.map((number) => number.value).join("")}
            onComplete={() => renderNextMove()}
          >
            <Row justify="space-evenly">
              {currentNumbers?.map((number, index) => (
                <Flipped key={number.value} flipId={number.value}>
                  <GameNumber
                    value={number.value}
                    key={number.value}
                    id={number.value}
                  />
                </Flipped>
              ))}
            </Row>
          </Flipper>
        </Col>
      ) : (
        <div>
          <Button onClick={() => startGame()}>Start the game</Button>
        </div>
      )}
    </Row>
  );
};

export default PlayGroundBody;
