import { Typography } from "antd";
import { CSSProperties, ReactNode } from "react";
type GameTextTypes = {
  type?: "normal" | "title";
  level?: 3 | 5 | 1 | 2 | 4 | undefined;
  children: ReactNode;
  styles?: CSSProperties;
};
const GameText = ({ children, styles }: GameTextTypes) => {
  return (
    <span style={{ fontFamily: "Machine Gunk", color: "#fff", ...styles }}>
      {children}
    </span>
  );
};

export default GameText;
