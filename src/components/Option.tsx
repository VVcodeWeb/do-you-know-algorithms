import { Col, Button } from "antd";
import GameText from "components/GameText";
import React from "react";
type OptionType = {
  isOptionVisible: boolean;
  text: string;
  handleAnswer: () => void;
};
const Option = ({ isOptionVisible, text, handleAnswer }: OptionType) => {
  return (
    <Col span={12}>
      <Button onClick={() => handleAnswer()}>
        <GameText
          styles={{ visibility: isOptionVisible ? "visible" : "hidden" }}
          type={"normal"}
        >
          {text}
        </GameText>
      </Button>
    </Col>
  );
};

export default Option;
