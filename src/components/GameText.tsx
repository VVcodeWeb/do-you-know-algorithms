import { Typography } from "antd";
import { CSSProperties, ReactNode } from "react";
type GameTextTypes = {
  type?: "normal" | "title";
  level?: 3 | 5 | 1 | 2 | 4 | undefined;
  children: ReactNode;
  styles?: CSSProperties;
};
const GameText = ({
  children,
  level,
  type = "title",
  styles,
}: GameTextTypes) => {
  if (type === "title")
    return (
      <Typography.Title style={{ ...styles, marginBottom: 0 }} level={level}>
        {children}
      </Typography.Title>
    );
  return <Typography style={styles}>{children}</Typography>;
};

export default GameText;
