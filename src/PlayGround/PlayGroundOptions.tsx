import { Row } from "antd";
import React, { useContext } from "react";
import Option from "components/Option";
import { GameContext } from "PlayGround/GameContext";
import { OptionsType } from "PlayGround";
type PlayGroundOptionsType = {
  handleAnswer: (userGuess: string) => void;
  options: Array<OptionsType>;
};

const PlayGroundOptions = () => {
  const { options, handleAnswer } = useContext(GameContext);
  return (
    <Row
      gutter={[30, 20]}
      style={{
        width: "100%",
        backgroundColor: "#fef5ff",
      }}
      align={"middle"}
    >
      {options.map((option, index) => {
        return (
          <Option
            key={option.sorting}
            text={option.sorting}
            isOptionVisible={option.visible}
            handleAnswer={handleAnswer}
            index={index}
          />
        );
      })}
    </Row>
  );
};

export default PlayGroundOptions;
