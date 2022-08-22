import "App.css";
import Footer from "components/Footer";
import Header from "components/Header";

import PlayGround from "PlayGround";
import { useCookie } from "hooks/useCookie";
import { Button, Drawer, Grid } from "@mui/material";
import GameText from "components/GameText";
function App() {
  const { visible, handleAccepted } = useCookie();
  return (
    <div className="main">
      <Drawer
        anchor={"top"}
        onClose={() => handleAccepted(false)}
        open={visible}
      >
        <Grid
          container
          justifyContent={"space-around"}
          alignItems="center"
          style={{
            minHeight: 50,
            background: "#000",
          }}
        >
          <GameText>Allow cookies so we can store your best streaks</GameText>
          <Button variant="outlined" onClick={() => handleAccepted(true)}>
            <GameText>Accept</GameText>
          </Button>
        </Grid>
      </Drawer>

      <Header />
      <PlayGround />
      <Footer />
    </div>
  );
}

export default App;
