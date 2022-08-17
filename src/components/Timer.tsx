import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Timer = ({
  handleTimeOut,
  timerKey,
  isTimerTicking,
}: {
  handleTimeOut: () => void;
  timerKey: React.Key;
  isTimerTicking: boolean;
}) => (
  <CountdownCircleTimer
    key={timerKey}
    isPlaying={isTimerTicking}
    onComplete={handleTimeOut}
    duration={25}
    size={50}
    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
    colorsTime={[7, 5, 2, 0]}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
);

export default Timer;
