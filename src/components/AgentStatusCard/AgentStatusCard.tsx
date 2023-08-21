import React from "react";
import { Col } from "antd";
import "../../pages/AgentDetails/style.scss";

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
  className,
}) => {
  return (
    <Col xs={24} sm={12} md={8} lg={8} xl={6}>
      <div className={`container ${className ? className : ""}`}>
        <img src={icon} alt="" className={iconClassName ? iconClassName : ""} />
        <div className="details">
          <h3>{value}</h3>
          <span>{label}</span>
        </div>
      </div>
    </Col>
  );
};

export default DeliveryStatusCard;
