import { Col, Row } from "antd";
import GameText from "components/GameText";
import { colFlex } from "const/styles";
import { ReactNode } from "react";
import { CaretRightFilled } from "@ant-design/icons";
import Timer from "components/Timer";
const HeaderSquare = ({ children }: { children: ReactNode }) => {
  return (
    <Col span={5} style={{ backgroundColor: "#F2F2F2", minHeight: "100px" }}>
      {children}
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
      <HeaderSquare>
        <div style={colFlex}>
          <GameText level={3}>Timer</GameText>
          <Timer
            isGameOn={isGameOn}
            timerKey={timerKey}
            handleTimeOut={handleTimeOut}
          />
        </div>
      </HeaderSquare>
      <HeaderSquare>
        <div style={colFlex}>
          <GameText level={3}>Score</GameText>
          <GameText level={3}>{score}</GameText>
        </div>
      </HeaderSquare>
      <HeaderSquare>
        <div style={colFlex}>
          <GameText level={3}>Difficulty</GameText>
          <GameText level={3}>Medium</GameText>
        </div>
      </HeaderSquare>
      {/* <HeaderSquare>
        <div style={colFlex}>
          <GameText level={3}>Actions</GameText>
          <GameText level={3}>
            <CaretRightFilled
              style={{ color: "green", fontSize: "56px", cursor: "pointer" }}
              onClick={() => alert("deprecated")}
            />
          </GameText>
        </div>
      </HeaderSquare> */}
    </Row>
  );
};

export default PlayGroundHeader;
