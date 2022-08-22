import GameText from "components/GameText";
import { ReactNode, useContext, useEffect, useRef } from "react";
import { GameContext } from "context/GameContext";
import { useScoreAnimation } from "hooks/useScoreAnimation";
import { HARD, EASY } from "const/constants";
import { useGameConfig } from "hooks/useGameConfig";
import { useCookie } from "hooks/useCookie";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
export const flex = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const HeaderSquare = ({
  children,
  title,
  icon,
  subheader,
}: {
  children: ReactNode;
  title: string;
  icon?: any;
  subheader?: any;
}) => {
  const background = {
    backgroundColor: "#3d3e9a",
  };
  const renderHeader = () => {
    if (!icon) return title;
    return (
      <Grid container justifyContent={"space-between"}>
        <GameText>{title}</GameText>
        <GameText>
          <div style={{ fontSize: 20 }}>{icon}</div>
        </GameText>
      </Grid>
    );
  };
  return (
    <Grid item md={3} xs={12}>
      <Card
        sx={{ maxWidth: 400, ...background, margin: "0 auto" }}
        elevation={10}
      >
        <CardHeader
          title={renderHeader()}
          subheader={<GameText>{subheader}</GameText>}
        />
        <CardContent
          style={{ ...flex, paddingTop: Boolean(subheader) ? 0 : 16 }}
        >
          {children}
        </CardContent>
      </Card>
    </Grid>
  );
};

const Timer = () => {
  const { timerKey, isTimerTicking, stopGame } = useContext(GameContext);
  const { TIMER_DURATION } = useGameConfig();
  return (
    <CountdownCircleTimer
      key={timerKey}
      isPlaying={isTimerTicking}
      onComplete={stopGame}
      duration={TIMER_DURATION}
      size={45}
      colors={["#86AC97", "#CE3226"]}
      strokeWidth={5}
      colorsTime={[7, 0]}
      trailColor={"#3d3e9a"}
    >
      {({ remainingTime }) => <GameText>{remainingTime}</GameText>}
    </CountdownCircleTimer>
  );
};
const PlayGroundHeader = () => {
  const { score, chooseDifficulty, isGameOn } = useContext(GameContext);
  const { difficultyIcon, easyTextStyle, hardTextStyle } = useGameConfig();
  const countElRef = useRef<HTMLDivElement>(null);
  const { animRef } = useScoreAnimation(countElRef);
  const { bestStreak } = useCookie();
  useEffect(() => {
    if (score.lastGainedScore) animRef.current?.play();
  }, [animRef, score]);
  const cursorStyle = { cursor: !isGameOn ? "pointer" : "not-allowed" };
  return (
    <Grid
      container
      spacing={{ xs: 1, sm: 2, md: 3 }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <HeaderSquare
        title={"Score"}
        icon={<>💯</>}
        subheader={`Best streak: ${bestStreak}`}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{ position: "absolute", left: 20, top: 0 }}
            ref={countElRef}
          >
            <GameText
              styles={{
                fontSize: 14,
                color: score.lastGainedScore > 0 ? "#3f8600" : "red",
              }}
            >
              +{score.lastGainedScore}
            </GameText>
          </div>
          <GameText styles={{ fontSize: 25 }}>{score.currentScore}</GameText>
        </div>
      </HeaderSquare>
      <HeaderSquare title={"Timer"} icon={<>⌛</>}>
        <Timer />
      </HeaderSquare>
      <HeaderSquare title={"Difficulty"} icon={difficultyIcon}>
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
    </Grid>
  );
};

export default PlayGroundHeader;
