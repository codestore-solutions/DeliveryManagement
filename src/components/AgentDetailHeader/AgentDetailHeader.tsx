import React from "react";
import { Row, Col, Image, Typography } from "antd";
import { DeleteIcon, LeftArrowIcon } from "../../assets";
import useDeliveryAgents from "../../pages/DeliveryAgents/Hook";
import useScreenWidth from "../../Hooks/ScreenWidthHook";
const { Title, Text } = Typography;

interface Props {
  data: any;
  goBack: () => void;
}

const AgentDetailHeader: React.FC<Props> = ({ data, goBack }) => {
  let searchInput = {};
  const { isSmallScreen } = useScreenWidth();
  const { showDeleteConfirm } = useDeliveryAgents(searchInput);
  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
      }}
    >
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
            {!isSmallScreen && (
              <Title level={4}>Delivery Partner Details</Title>
            )}
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
            <div
              className="badge-icons"
              onClick={() => showDeleteConfirm(data?.agentId)}
            >
              <Image preview={false} src={DeleteIcon} alt="" />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AgentDetailHeader;