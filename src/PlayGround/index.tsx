import { Grid } from "@mui/material";
import PlayGroundBody from "PlayGround/PlayGroundBody";
import PlayGroundHeader from "PlayGround/PlayGroundHeader";
import styles from "PlayGround/styles.module.css";

const PlayGround = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-begin"
      spacing={1}
      className={styles["play-ground"]}
    >
      <Grid item xs={3} style={{ marginTop: 0 }}>
        <PlayGroundHeader />
      </Grid>
      <Grid item xs={8}>
        <PlayGroundBody />
      </Grid>
    </Grid>
  );
};

export default PlayGround;
