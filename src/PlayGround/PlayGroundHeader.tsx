import { Card, Col, Row } from "antd";
import GameText from "components/GameText";
import { ReactNode, useContext, useEffect } from "react";
import Timer from "components/Timer";
import { GameContext } from "PlayGround/GameContext";

const HeaderSquare = ({
  children,
  title,
  icon,
}: {
  children: ReactNode;
  title: string;
  icon?: any;
}) => {
  return (
    <Col span={5} style={{ backgroundColor: "#F2F2F2" }}>
      <Card
        bordered={false}
        extra={icon}
        title={
          <GameText type="normal" styles={{ textTransform: "uppercase" }}>
            {title}
          </GameText>
        }
        style={{ height: "100%" }}
        bodyStyle={{ display: "flex", justifyContent: "center" }}
      >
        {children}
      </Card>
    </Col>
  );
};
type PlayGroundHeaderType = {
  score: number;
  isGameOn: boolean;
  timerKey: React.Key;
  handleTimeOut: () => void;
  isTimerTicking: boolean;
};
const PlayGroundHeader = () => {
  const { score, timerKey, isTimerTicking, stopGame } = useContext(GameContext);
  return (
    <Row justify={"center"} gutter={3} style={{ width: "100%" }}>
      <HeaderSquare
        title={"Score"}
        icon={<div style={{ fontSize: 20 }}>💯</div>}
      >
        <GameText type="normal">{score}</GameText>
      </HeaderSquare>
      <HeaderSquare
        title={"Timer"}
        icon={<div style={{ fontSize: 20 }}>{""}⌛</div>}
      >
        <Timer
          timerKey={timerKey}
          handleTimeOut={stopGame}
          isTimerTicking={isTimerTicking}
        />
      </HeaderSquare>
      <HeaderSquare
        title={"Difficulty"}
        icon={<div style={{ fontSize: 20 }}>😳</div>}
      >
        <GameText type="normal">
          Easy/<span style={{ color: "green" }}>Hard</span>
        </GameText>
      </HeaderSquare>
    </Row>
  );
};

export default PlayGroundHeader;
