import { GameContext } from "PlayGround/GameContext";
import { useGameConfig } from "PlayGround/hooks/useGameConfig";
import { useContext } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Timer = () => {
  const { timerKey, isTimerTicking, stopGame } = useContext(GameContext);
  const { TIMER_DURATION } = useGameConfig();
  return (
    <CountdownCircleTimer
      key={timerKey}
      isPlaying={isTimerTicking}
      onComplete={stopGame}
      duration={TIMER_DURATION}
      size={50}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[7, 5, 2, 0]}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  );
};
export default Timer;
