import PlayGroundBody from "PlayGround/PlayGroundBody";
import PlayGroundHeader from "PlayGround/PlayGroundHeader";
import PlayGroundOptions from "PlayGround/PlayGroundOptions";
import GameProvider from "PlayGround/GameContext";
import styles from "PlayGround/styles.module.css";
const PlayGround = () => {
  return (
    <GameProvider>
      <div className={styles["play-ground"]}>
        <PlayGroundHeader />
        <PlayGroundBody />
        <PlayGroundOptions />
      </div>
    </GameProvider>
  );
};

export default PlayGround;
