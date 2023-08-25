import React from "react";
import { Col, Row, Image, Typography } from "antd";
import "../../pages/AgentDetails/style.scss";

const { Text, Title } = Typography;

interface DeliveryStatusCardProps {
  icon: string;
  iconClassName?: string;
  value: string;
  label: string;
  className?: string;
}

const DeliveryStatusCard: React.FC<DeliveryStatusCardProps> = ({
  icon,
  iconClassName,
  value,
  label,
}) => {
  return (
    <Col xs={24} sm={12} md={8} lg={8} xl={6}>
      <Row gutter={10} className="status-card">
        <Col>
          <Image
            preview={false}
            src={icon}
            alt=""
            className={iconClassName ? iconClassName : ""}
          />
        </Col>
        <Col>
          <Title level={5} style={{ display:'flex', flexDirection:'column', paddingTop: "5px" }}>
            {value}
            <Text className="container-col">{label}</Text>
          </Title>
        </Col>
      </Row>
    </Col>
  );
};

export default DeliveryStatusCard;
