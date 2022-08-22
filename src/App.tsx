import { Button, Drawer } from "antd";
import "App.css";
import Footer from "components/Footer";
import Header from "components/Header";

import PlayGround from "PlayGround";
import { useCookie } from "hooks/useCookie";
function App() {
  const { visible, handleAccepted } = useCookie();
  return (
    <div className="body">
      <Drawer
        title="Allow cookies so we can store your best streaks"
        placement={"top"}
        width={100}
        height={70}
        onClose={() => handleAccepted(false)}
        visible={visible}
        extra={
          <Button type="primary" onClick={() => handleAccepted(true)}>
            Accept
          </Button>
        }
      />

      <Header />
      <PlayGround />
      <Footer />
    </div>
  );
}

export default App;
