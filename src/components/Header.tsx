import { Col, Row } from "antd";
import GameText from "components/GameText";
import { InfoCircleOutlined } from "@ant-design/icons";
import logo from "components/../../public/algorithm.png";
const Header = () => {
  return (
    <div
      style={{
        paddingTop: 15,
        paddingBottom: 15,
        borderBottom: "1px solid #ccc",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        marginBottom: 15,
      }}
    >
      <Row justify="space-around" align="middle">
        <Col span={3}>
          <InfoCircleOutlined
            style={{ fontSize: 40, color: "rgb(71, 211, 239)" }}
          />
        </Col>
        <Col span={15} style={{ display: "inline-block" }}>
          <GameText>Do you know THE algorithms?</GameText>
        </Col>
        <Col span={3}>
          <img src={logo} alt="logo" className="" width={50} height={50} />
        </Col>
      </Row>
    </div>
  );
};

export default Header;
