import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Timer = ({
  isGameOn,
  handleTimeOut,
  timerKey,
}: {
  isGameOn: boolean;
  handleTimeOut: () => void;
  timerKey: React.Key;
}) => (
  <CountdownCircleTimer
    key={timerKey}
    isPlaying={isGameOn}
    onComplete={handleTimeOut}
    duration={10}
    size={50}
    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
    colorsTime={[7, 5, 2, 0]}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
);

export default Timer;
