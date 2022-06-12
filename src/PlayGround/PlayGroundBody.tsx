import { Col, Row } from "antd";
import GameNumber, { GameNumberTypes } from "components/GameNumber";
import { MAX_NUMBERS } from "const/constants";
import React from "react";
import { useEffect, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { quickSort } from "utils/sorting";
export type MoveJournalType = {
  swapIndexOne: number;
  swapIndexTwo: number;
  step: number;
  rendered: boolean;
};

type PlayGroundBodyType = {
  gameIsOn: boolean;
};
const PlayGroundBody = ({ gameIsOn }: PlayGroundBodyType) => {
  const [currentNumbers, setCurrentNumbers] = useState<GameNumberTypes[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [moveJournal, setMoveJournal] = useState<MoveJournalType[]>([]);
  const generateRandomNumbers = (): GameNumberTypes[] => {
    let arr = [];
    while (arr.length < MAX_NUMBERS) {
      let r = Math.floor(Math.random() * 100) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr.map((value, index) => ({
      value,
      key: index,
      id: value,
    }));
  };

  const sortNumbers = () => {
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
  useEffect(() => {
    console.log({ currentNumbers });
  }, [currentNumbers]);

  useEffect(() => {
    if (gameIsOn) sortNumbers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameIsOn]);

  useEffect(() => {
    setCurrentNumbers(generateRandomNumbers());
    setIsSorted(false);
  }, []);

  useEffect(() => {
    if (moveJournal.length > 0) {
      if (!moveJournal[0].rendered) renderNextMove();
      if (moveJournal[moveJournal.length - 1].rendered) allMovesRendered();
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

  const allMovesRendered = () => {};
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
    </Row>
  );
};

export default PlayGroundBody;
