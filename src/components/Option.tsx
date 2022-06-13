import { Col, Button } from "antd";
import GameText from "components/GameText";
import { optionStyle } from "const/styles";
import CSS from "csstype";
import React from "react";
type OptionType = {
  isOptionVisible: boolean;
  text: string;
  handleAnswer: () => void;
  index: number;
};
export const getColor = (index: number): CSS.Properties => {
  switch (index) {
    case 0:
      return {
        backgroundColor: "rgb(227, 117, 244)",
        boxShadow: "rgb(182, 97, 204) 5px 3px 0px 3px",
      };
    case 1:
      return {
        backgroundColor: "rgb(150, 218, 255)",
        boxShadow: "rgb(26, 156, 175) 5px 3px 0px 3px",
      };
    case 2:
      return {
        backgroundColor: "rgb(97, 206, 112)",
        boxShadow: "rgb(76, 163, 81) 5px 3px 0px 3px",
      };
    default:
      return {
        backgroundColor: "rgb(252, 198, 118)",
        boxShadow: "rgb(175, 132, 82) 5px 3px 0px 3px",
      };
  }
};
const Option = ({ isOptionVisible, text, handleAnswer, index }: OptionType) => {
  return (
    <Col span={12} push={3}>
      <Button
        onClick={() => handleAnswer()}
        style={{ ...optionStyle, ...getColor(index) }}
      >
        <GameText
          styles={{
            visibility: isOptionVisible ? "visible" : "hidden",
            fontSize: "25px",
            color: "#fff",
            fontWeight: "bold",
          }}
          type={"normal"}
        >
          {text}
        </GameText>
      </Button>
    </Col>
  );
};

export default Option;
