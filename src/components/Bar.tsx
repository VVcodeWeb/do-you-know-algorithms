import { CSSProperties } from "react";
import { GAME_BAR } from "const/constants";

const Bar = ({ value, color }: { value: number; color: string }) => {
  const styles: CSSProperties = {
    height: value,
    width: "10px",
    border: "1px solid black",
    marginLeft: 1,
    marginRight: 1,
  };
  return (
    <div className={GAME_BAR} style={{ ...styles, backgroundColor: color }} />
  );
};

export default Bar;
