import { Row } from "antd";
import React from "react";
import Option from "components/Option";
import { OptionsType } from "PlayGround/PlayGround";
type PlayGroundOptionsType = {
  handleAnswer: (userGuess: string) => void;
  options: Array<OptionsType>;
};

const PlayGroundOptions = ({
  handleAnswer,
  options,
}: PlayGroundOptionsType) => {
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
