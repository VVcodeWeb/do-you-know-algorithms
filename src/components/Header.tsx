import { Col, Row } from "antd";
import GameText from "components/Text";
const Header = () => {
  return (
    <div style={{ paddingTop: 15, paddingBottom: 15 }}>
      <Row justify="space-around" align="middle">
        <Col span={3}>
          <GameText>Info</GameText>
        </Col>
        <Col span={15}>
          <GameText>Do you know THE algorithms</GameText>
        </Col>
        <Col span={3}>
          <GameText>rest</GameText>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
