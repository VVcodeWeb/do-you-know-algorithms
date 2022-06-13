import { Card, Col, Row } from "antd";
import GameText from "components/GameText";
import { ReactNode } from "react";
import Timer from "components/Timer";
const HeaderSquare = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <Col span={5} style={{ backgroundColor: "#F2F2F2" }}>
      <Card
        bordered={false}
        title={
          <GameText type="normal" styles={{ textTransform: "uppercase" }}>
            {title}
          </GameText>
        }
        style={{ height: "100%" }}
      >
        {children}
      </Card>
    </Col>
  );
};
type PlayGroundHeaderType = {
  startGame: () => void;
  score: number;
  isGameOn: boolean;
  timerKey: React.Key;
  handleTimeOut: () => void;
};
const PlayGroundHeader = ({
  startGame,
  score,
  isGameOn,
  timerKey,
  handleTimeOut,
}: PlayGroundHeaderType) => {
  return (
    <Row justify={"center"} gutter={3} style={{ width: "100%" }}>
      <HeaderSquare title={"Timer"}>
        <Timer
          isGameOn={isGameOn}
          timerKey={timerKey}
          handleTimeOut={handleTimeOut}
        />
      </HeaderSquare>
      <HeaderSquare title={"Score"}>
        <GameText type="normal">{score}</GameText>
      </HeaderSquare>
      <HeaderSquare title={"Difficulty"}>
        <GameText type="normal">
          Easy/<span style={{ color: "green" }}>Hard</span>
        </GameText>
      </HeaderSquare>
    </Row>
  );
};

export default PlayGroundHeader;
