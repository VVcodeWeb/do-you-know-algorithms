import { CSSProperties, ReactNode } from "react";
type GameTextTypes = {
  children: ReactNode;
  styles?: CSSProperties;
  onClick?: any;
};
const GameText = ({ children, styles, onClick }: GameTextTypes) => {
  return (
    <span
      onClick={onClick}
      style={{ fontFamily: "Machine Gunk", color: "#fff", ...styles }}
    >
      {children}
    </span>
  );
};

export default GameText;
