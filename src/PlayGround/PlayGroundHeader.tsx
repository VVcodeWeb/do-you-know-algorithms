import { Col, Row } from "antd";
import GameText from "components/Text";
import { colFlex } from "const/styles";
import { ReactNode } from "react";
import { CaretRightFilled } from "@ant-design/icons";
const HeaderSquare = ({ children }: { children: ReactNode }) => {
  return (
    <Col span={5} style={{ backgroundColor: "#F2F2F2", minHeight: "100px" }}>
      {children}
    </Col>
  );
};
type PlayGroundHeaderType = {
  startGame: () => void;
};
const PlayGroundHeader = ({ startGame }: PlayGroundHeaderType) => {
  return (
    <Row justify={"center"} gutter={3} style={{ width: "100%" }}>
      <HeaderSquare>
        <div style={colFlex}>
          <GameText level={3}>Time left</GameText>
          <GameText level={3}>15.00</GameText>
        </div>
      </HeaderSquare>
      <HeaderSquare>
        <div style={colFlex}>
          <GameText level={3}>Score</GameText>
          <GameText level={3}>0 / 20</GameText>
        </div>
      </HeaderSquare>
      <HeaderSquare>
        <div style={colFlex}>
          <GameText level={3}>Speed</GameText>
          <GameText level={3}>Default</GameText>
        </div>
      </HeaderSquare>
      <HeaderSquare>
        <div style={colFlex}>
          <GameText level={3}>Actions</GameText>
          <GameText level={3}>
            <CaretRightFilled
              style={{ color: "green", fontSize: "56px", cursor: "pointer" }}
              onClick={() => startGame()}
            />
          </GameText>
        </div>
      </HeaderSquare>
    </Row>
  );
};

export default PlayGroundHeader;
