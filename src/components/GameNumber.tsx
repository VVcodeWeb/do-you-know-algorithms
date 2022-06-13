import { Col, Typography } from "antd";
import { numbersStyle } from "const/styles";

export type GameNumberTypes = {
  value: number;
  id: string | number;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const textShadow = { textShadow: "1px 1px 2px black" };
const GameNumber = ({ value, id, ...rest }: GameNumberTypes) => {
  return (
    <div style={{ display: "inline-block" }}>
      <Col span={1} style={{ ...numbersStyle }}>
        <Typography
          {...rest}
          style={{ color: "#fff", display: "inline-block" }}
        >
          {value}
        </Typography>
      </Col>
    </div>
  );
};

export default GameNumber;
