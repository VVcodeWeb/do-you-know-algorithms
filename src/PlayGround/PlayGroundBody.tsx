import { Button, Col, Row } from "antd";
import GameText from "components/GameText";
import { getColor } from "components/Option";
import { GAME_BAR, IS_RENDERING, SWAP } from "const/constants";
import {
  BarInComparison,
  BarInSwap,
  nonActiveBar,
  optionStyle,
} from "const/styles";
import Bar from "components/Bar";
import { GameContext } from "PlayGround/GameContext";
import { GameBarTypes, MoveJournalType } from "PlayGround/types";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { quickSort } from "utils/sorting";
import { delay, generateRandomNumbers, getRandomNumber } from "utils/utils";

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
      setCurrentBars(randomBars);
      setMoveJournal(updatedMoveJournal);
    }
  }, [options, isGameOn]);

  useEffect(() => {
    (async function renderNextMove() {
      const nextMove = moveJournal.find((x) => !x.rendered);
      if (nextMove && !shouldRenderStop) {
        updateRenderingStates({ stateName: IS_RENDERING, value: true });
        const gameBars = document.getElementsByClassName(
          GAME_BAR
        ) as HTMLCollectionOf<HTMLElement>;
        const color = nextMove.action === SWAP ? BarInSwap : BarInComparison;
        await delay(150);
        gameBars[nextMove.indexOne].style.backgroundColor = color;
        gameBars[nextMove.indexTwo].style.backgroundColor = color;
        await delay(150);
        if (nextMove.action === SWAP) {
          const tempHeight = gameBars[nextMove.indexOne].style.height;
          gameBars[nextMove.indexOne].style.height =
            gameBars[nextMove.indexTwo].style.height;
          gameBars[nextMove.indexTwo].style.height = tempHeight;
        }
        gameBars[nextMove.indexOne].style.backgroundColor = nonActiveBar;
        gameBars[nextMove.indexTwo].style.backgroundColor = nonActiveBar;
        updateRenderingStates({ stateName: IS_RENDERING, value: false });
        if (nextMove.step === 0) showAnswers();
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
