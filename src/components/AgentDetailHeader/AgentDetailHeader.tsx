import React from "react";
import { Row, Col, Image, Typography, message } from "antd";
import { DeleteIcon, LeftArrowIcon } from "../../assets";

import useDeliveryAgents from "../../pages/DeliveryAgents/Hook";

const { Title, Text } = Typography;

interface Props {
  data: any;
  goBack: () => void;
}

const AgentDetailHeader: React.FC<Props> = ({ data, goBack }) => {
  let searchInput ={};
  const {deleteAgent} = useDeliveryAgents(searchInput)

  
  return (
    <Row style={{ display: "flex", justifyContent: "space-between" }}>
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
            <Title level={4}>Delivery Partner Details</Title>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row gutter={5} style={{ display: "flex", alignItems: "center" }}>
          <Col>
            <Row gutter={5} style={{ display: "flex", alignItems: "center" }}>
              <Col>
                <Text>Status:</Text>
              </Col>
              <Col>
                {data?.agentStatus ? (
                  <Text type="success"> Available </Text>
                ) : (
                  <Text type="danger"> Not Available </Text>
                )}
              </Col>
            </Row>
          </Col>
          <Col>
            <div className="badge-icons" onClick={() => deleteAgent(data?.agentId)}>
              <Image preview={false} src={DeleteIcon} alt="" />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AgentDetailHeader;
