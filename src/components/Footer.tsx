import { Divider, Grid } from "@mui/material";
import gitLogo from "components/../../public/tl.webp";
import linkedinLogo from "components/../../public/linkedin.webp";
import { flex } from "PlayGround/PlayGroundHeader";
const Footer = () => {
  return (
    <Grid
      container
      direction={"row"}
      style={{
        position: "relative",
        width: "100%",
        paddingLeft: 15,
        paddingRight: 15,
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
      }}
    >
      <Grid
        item
        xs={4}
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          alignContent: "flex-end",
        }}
      >
        <a
          href="https://www.flaticon.com/free-icons/algorithm"
          title="algorithm icons"
          style={{ color: "white" }}
        >
          Algorithm icons created by Freepik - Flaticon
        </a>
      </Grid>
      <Grid item xs={4}>
        <div style={{ paddingTop: 10, paddingBottom: 10, ...flex }}>
          <img src={gitLogo} alt="logo" width={30} height={30} />
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            style={{
              width: 1,
              marginLeft: 5,
              marginRight: 5,
            }}
          />
          <img src={linkedinLogo} alt="logo" width={30} height={30} />
        </div>
      </Grid>
    </Grid>
  );
};

export default Footer;
