import PlayGroundBody from "PlayGround/PlayGroundBody";
import PlayGroundHeader from "PlayGround/PlayGroundHeader";
import { colFlex } from "const/styles";
import { useState } from "react";

const PlayGround = () => {
  const [gameIsOn, setGameIsOn] = useState<boolean>(false);
  const startGame = () => {
    if (!gameIsOn) setGameIsOn(true);
  };
  return (
    <div
      style={{
        ...colFlex,
        width: "100%",
      }}
    >
      <PlayGroundHeader startGame={startGame} />
      <PlayGroundBody gameIsOn={gameIsOn} />
    </div>
  );
};

export default PlayGround;
