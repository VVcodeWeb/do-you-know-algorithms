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
    <Row gutter={[16, 16]} style={{ minHeight: 200, paddingTop: 15 }}>
      <Option
        text={"first option"}
        isOptionVisible={areOptionsVisible}
        handleAnswer={handleAnswer}
      />
      <Option
        text={"second option"}
        isOptionVisible={areOptionsVisible}
        handleAnswer={handleAnswer}
      />

      <Option
        text={"third option"}
        isOptionVisible={areOptionsVisible}
        handleAnswer={handleAnswer}
      />
      <Option
        text={"fourth option"}
        isOptionVisible={areOptionsVisible}
        handleAnswer={handleAnswer}
      />
    </Row>
  );
};

export default PlayGroundOptions;
