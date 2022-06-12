import { Typography } from "antd";
import { ReactNode } from "react";
type GameTextTypes = {
  type?: "normal" | "title";
  level?: 3 | 5 | 1 | 2 | 4 | undefined;
  children: ReactNode;
};
const GameText = ({ children, level, type = "title" }: GameTextTypes) => {
  if (type === "title")
    return <Typography.Title level={level}>{children}</Typography.Title>;
  return <Typography>{children}</Typography>;
};

export default GameText;
