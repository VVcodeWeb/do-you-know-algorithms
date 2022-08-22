import { Grid } from "@mui/material";
import PlayGroundBody from "PlayGround/PlayGroundBody";
import PlayGroundHeader from "PlayGround/PlayGroundHeader";
import styles from "PlayGround/styles.module.css";

const PlayGround = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="flex-begin"
      className={styles["play-ground"]}
    >
      <Grid item xs={12} /* style={{ width: "100%" }} */>
        <PlayGroundHeader />
      </Grid>
      <Grid item xs={12}>
        <PlayGroundBody />
      </Grid>
    </Grid>
  );
};

export default PlayGround;
