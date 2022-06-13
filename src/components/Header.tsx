import { Col, Row } from "antd";
import GameText from "components/GameText";
import { InfoCircleOutlined } from "@ant-design/icons";
import logo from "components/../../public/algorithm.png";
const Header = () => {
  return (
    <div
      style={{
        borderBottom: "1px solid #ccc",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        marginBottom: 5,
        minHeight: 70,
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <Row justify="space-around" align="middle" style={{ width: "100%" }}>
        <Col span={3}>
          <InfoCircleOutlined
            style={{ fontSize: 40, color: "rgb(71, 211, 239)" }}
          />
        </Col>
        <Col span={15} style={{ display: "inline-block" }}>
          <GameText type="normal" styles={{ fontSize: 30 }}>
            Do you know THE algorithms?
          </GameText>
        </Col>
        <Col span={3} push={2}>
          <img src={logo} alt="logo" className="" width={50} height={50} />
        </Col>
      </Row>
    </div>
  );
};

export default Header;
