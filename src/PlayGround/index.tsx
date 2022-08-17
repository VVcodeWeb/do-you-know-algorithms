import PlayGroundBody from "PlayGround/PlayGroundBody";
import PlayGroundHeader from "PlayGround/PlayGroundHeader";
import { colFlex } from "const/styles";
import PlayGroundOptions from "PlayGround/PlayGroundOptions";
import GameProvider from "PlayGround/GameContext";

const PlayGround = () => {
  return (
    <GameProvider>
      <div
        style={{
          ...colFlex,
          width: "100%",
          paddingTop: 10,
          backgroundColor: "#fef5ff",
        }}
      >
        <PlayGroundHeader />
        <PlayGroundBody />
        <PlayGroundOptions />
      </div>
    </GameProvider>
  );
};

export default PlayGround;
