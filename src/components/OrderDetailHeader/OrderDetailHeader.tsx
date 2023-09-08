import React from "react";
import { Row, Col, Image, Button, Typography } from "antd";
import { LeftArrowIcon } from "../../assets";
import useScreenWidth from "../../Hooks/ScreenWidthHook";
const { Title } = Typography;
interface Props {
  goBack: () => void;
  data: any;
  handleOpenModal: (data: any) => void;
}
const OrderDetailHeader: React.FC<Props> = ({ goBack, data, handleOpenModal }) => {
  const {isSmallScreen} = useScreenWidth()
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
           {!isSmallScreen && <Title level={4}>Order Details</Title>}
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
            onClick={() => handleOpenModal(data)}
          >
            Assign Agent
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default OrderDetailHeader;
