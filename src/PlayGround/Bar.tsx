import { CSSProperties } from "react";

const Bar = ({ value, color }: { value: number; color: string }) => {
  const styles: CSSProperties = {
    height: value * 2,
    width: "15px",
    border: "1px solid black",
    marginLeft: 1,
    marginRight: 1,
  };
  return (
    <div
      className={"game-bar"}
      style={{ ...styles, backgroundColor: color }}
    ></div>
  );
};

export default Bar;
