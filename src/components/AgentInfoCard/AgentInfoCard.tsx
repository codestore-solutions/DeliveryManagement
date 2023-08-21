import React from "react";
import { Col } from "antd";
import '../../pages/AgentDetails/style.scss'
interface InfoCardProps {
  title: string;
  data: { [key: string]: string };
}

const AgentInfoCard: React.FC<InfoCardProps> = ({ title, data }) => {
  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
      <div className="card-container">
        <h3>{title}</h3>
        <div className="container-content">
          {Object.entries(data).map(([label, value]) => (
            <div className="container-row" key={label}>
              <span className="container-col">{label}</span>
              <span className="container-col dark">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </Col>
  );
};

export default AgentInfoCard;
