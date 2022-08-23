import { useContext } from "react";
import { Button, Grid } from "@mui/material";

import { GameContext } from "context/GameContext";
import GameText from "components/GameText";
import { OptionType } from "PlayGround/types";
import { flex } from "PlayGround/PlayGroundHeader";

const Option = ({ option, handleAnswer }: OptionType) => {
  return (
    <Grid item md={6} xs={12} style={{ ...flex }}>
      <Button
        onClick={() => handleAnswer(option.sorting)}
        variant={"contained"}
        style={{
          borderBottomRightRadius: 60,
          borderBottomLeftRadius: 60,
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          minWidth: 350,
          background: option.color,
          visibility: option.visible ? "visible" : "hidden",
        }}
        disabled={!option.visible}
      >
        <GameText
          styles={{
            fontSize: "19px",
            fontWeight: "bold",
          }}
        >
          {option.sorting}
        </GameText>
      </Button>
    </Grid>
  );
};
export const PlayGroundOptions = () => {
  const { options, handleAnswer } = useContext(GameContext);
  return (
    <Grid container spacing={1}>
      {options.map((option, index) => {
        return (
          <Option
            key={option.sorting}
            option={option}
            handleAnswer={handleAnswer}
          />
        );
      })}
    </Grid>
  );
};

export default PlayGroundOptions;
