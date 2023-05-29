import React from "react";
import "./style.scss";
import { useLocation } from "react-router-dom";
import { Button, Row, Col } from "antd";

const AgentDetails: React.FC = () => {
  const location = useLocation();
  const state = location.state;
  // console.log("Dey", state)
  return (
    <div id="agent-details">
      <h2 className="heading">Details Page</h2>
      <div className="content">
        <Row className="content-row">
          <Col span={5} className="col-item">
            <span>ID: </span>
            <p>{state.deliveryAgentId}</p>
          </Col>
          <Col span={5} className="col-item">
          <span>Name: </span>
            <p>{state.deliveryAgentName}</p>
          </Col>
        </Row>
        <Row  className="content-row">
          <Col span={5} className="col-item">
          <span>Address: </span>
            <p> {state.deliveryAgentAddress}</p>
          </Col>
          <Col span={5} className="col-item">
          <span>Status: </span>
            <p>{state.verStatus === 2 ? "Pending" : "Verified"}</p>
          </Col>
        </Row>
        <Row  className="content-row">
          <Col span={5} className="col-item">
          <span>Aadhar Card: </span>
            <p> View Document</p>
          </Col>
          <Col span={5} className="col-item">
          <span>Pan Card: </span>
            <p>View Document</p>
          </Col>
        </Row>
        <Button>Verify</Button>
        <Button>Decline</Button>
      </div>
    </div>
  );
};

export default AgentDetails;
