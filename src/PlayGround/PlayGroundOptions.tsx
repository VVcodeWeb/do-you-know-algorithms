import { Row } from "antd";
import React from "react";
import Option from "components/Option";
type PlayGroundOptionsType = {
  areOptionsVisible: boolean;
  handleAnswer: () => void;
};

const PlayGroundOptions = ({
  areOptionsVisible,
  handleAnswer,
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
      <Option
        text={"Merge sort"}
        isOptionVisible={areOptionsVisible}
        handleAnswer={handleAnswer}
        index={0}
      />
      <Option
        text={"Heap sort"}
        isOptionVisible={areOptionsVisible}
        handleAnswer={handleAnswer}
        index={1}
      />

      <Option
        text={"Quick sort"}
        isOptionVisible={areOptionsVisible}
        handleAnswer={handleAnswer}
        index={2}
      />
      <Option
        text={"Bubble sort"}
        isOptionVisible={areOptionsVisible}
        handleAnswer={handleAnswer}
        index={3}
      />
    </Row>
  );
};

export default PlayGroundOptions;
