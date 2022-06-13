import { Col, Row } from "antd";
import gitLogo from "components/../../public/GitHub-logo.png";
const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        height: 50,
        position: "absolute",
        left: 0,
        bottom: 0,
        paddingLeft: 15,
        paddingRight: 15,
        borderTop: "1px solid #ccc",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        backgroundColor: "#fff",
      }}
    >
      <Row justify="center">
        <Col span={8}>
          <a
            href="https://www.flaticon.com/free-icons/algorithm"
            title="algorithm icons"
          >
            Algorithm icons created by Freepik - Flaticon
          </a>
        </Col>
        <Col>
          <img src={gitLogo} alt="logo" className="" width={80} height={50} />
        </Col>
        <Col span={8}>Created by VV.</Col>
      </Row>
    </div>
  );
};

export default Footer;
