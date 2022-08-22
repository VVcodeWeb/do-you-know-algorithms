import GameText from "components/GameText";
import logo from "components/../../public/programming.png";
import Grid2 from "@mui/material/Unstable_Grid2";
import { flex } from "PlayGround/PlayGroundHeader";
const Header = () => {
  return (
    <div
      style={{
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        marginBottom: 5,
        minHeight: 70,
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <Grid2
        container
        justifyContent="space-between"
        direction={"row"}
        alignItems="middle"
        style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}
        spacing={1}
      >
        <Grid2
          md={10}
          xs={10}
          mdOffset={1}
          xsOffset={0}
          style={{
            ...flex,
            justifyContent: "flex-start",
          }}
        >
          <GameText type="normal" styles={{ fontSize: 25 }}>
            Do you know THE algorithms?
          </GameText>
        </Grid2>
        <Grid2
          md={1}
          xsOffset={0}
          style={{ ...flex, justifyContent: "flex-end" }}
        >
          <img src={logo} alt="logo" className="" width={50} height={50} />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Header;
