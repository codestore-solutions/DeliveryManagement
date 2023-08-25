import React from "react";
import { Row, Col, Image, Button, Typography } from "antd";
import { LeftArrowIcon } from "../../assets";
const { Title } = Typography;
interface Props {
  goBack: () => void;
  data: any;
}
const OrderDetailHeader: React.FC<Props> = ({ goBack, data }) => {
  return (
    <Row style={{ display: "flex", justifyContent: "space-between", padding:"10px 0" }}>
      <Col>
        <Row gutter={16}>
          <Col onClick={goBack}>
            <Image
              src={LeftArrowIcon}
              preview={false}
              alt="Back"
              style={{ cursor: "pointer", paddingTop: "5px" }}
            />
          </Col>
          <Col>
            <Title level={4}>Order Details</Title>
          </Col>
        </Row>
      </Col>
      <Col>
        {(data?.orderStatus === 4 || data?.orderStatus === 7) && (
          <Button
            type="primary"
            style={{
              height: "45px",
              backgroundColor: "#545BFC",
              padding: "10px 25px",
              fontWeight: "600",
              borderRadius: "15px",
            }}
          >
            Assign Agent
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default OrderDetailHeader;
