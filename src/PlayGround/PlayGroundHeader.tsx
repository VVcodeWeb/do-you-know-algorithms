import { Card, Col, Row, Statistic } from "antd";
import GameText from "components/GameText";
import { ReactNode, useContext, useEffect, useRef } from "react";
import Timer from "components/Timer";
import { GameContext } from "PlayGround/GameContext";
import { useScoreAnimation } from "PlayGround/hooks/useScoreAnimation";
import { HARD, EASY } from "const/constants";
import { useGameConfig } from "PlayGround/hooks/useGameConfig";
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

const PlayGroundHeader = () => {
  const { score, chooseDifficulty, isGameOn } = useContext(GameContext);
  const { difficultyIcon, easyTextStyle, hardTextStyle } = useGameConfig();
  const countElRef = useRef<HTMLDivElement>(null);
  const { animRef } = useScoreAnimation(countElRef);
  useEffect(() => {
    if (score.lastGainedScore) animRef.current?.play();
  }, [animRef, score]);
  const cursorStyle = { cursor: !isGameOn ? "pointer" : "not-allowed" };
  return (
    <Row justify={"center"} gutter={3} style={{ width: "100%" }}>
      <HeaderSquare
        title={"Score"}
        icon={<div style={{ fontSize: 20 }}>💯</div>}
      >
        <div style={{ position: "absolute", left: 20, top: 0 }}></div>
        <div style={{ position: "relative" }}>
          <div
            style={{ position: "absolute", left: 20, top: 0 }}
            ref={countElRef}
          >
            <Statistic
              value={
                score.lastGainedScore > 0
                  ? "+" + score.lastGainedScore
                  : score.lastGainedScore
              }
              precision={0}
              valueStyle={{
                fontSize: 14,
                color: score.lastGainedScore > 0 ? "#3f8600" : "red",
              }}
            />
          </div>
          <Statistic value={score.currentScore} precision={0} />
        </div>
      </HeaderSquare>
      <HeaderSquare
        title={"Timer"}
        icon={<div style={{ fontSize: 20 }}>{""}⌛</div>}
      >
        <Timer />
      </HeaderSquare>
      <HeaderSquare
        title={"Difficulty"}
        icon={<div style={{ fontSize: 20 }}>{difficultyIcon}</div>}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            position: "relative",
          }}
        >
          <GameText type="normal" styles={cursorStyle}>
            <span
              onClick={!isGameOn ? () => chooseDifficulty(HARD) : undefined}
              style={hardTextStyle}
            >
              Hard
            </span>
          </GameText>
          <GameText type="normal" styles={cursorStyle}>
            <span
              onClick={!isGameOn ? () => chooseDifficulty(EASY) : undefined}
              style={easyTextStyle}
            >
              Easy
            </span>
          </GameText>
        </div>
      </HeaderSquare>
    </Row>
  );
};

export default PlayGroundHeader;
