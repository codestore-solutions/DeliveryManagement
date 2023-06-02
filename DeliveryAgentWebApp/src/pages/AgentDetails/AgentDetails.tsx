import React, { useState } from "react";
import "./style.scss";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import AgentServices from "../../services/AgentServices";
import { LoadingOutlined } from "@ant-design/icons";
import { LeftArrowIcon } from "../../assets";

const antIcon = <LoadingOutlined style={{ color: "#fff" }} spin />;
const AgentDetails: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const state = location.state;
  // console.log("Dey", state)
  const verifyAgentHandler = async () => {
    let instance = AgentServices.getInstance();
    setLoading(true);
    instance.verifyAgent(state.deliveryAgentId, 1).then((res) => {
      if (res) setLoading(false);
    });
  };

  return (
    <div id="agent-details">
      <div className="header">
        <img src={LeftArrowIcon} alt="" />
        <h3>Details</h3>
      </div>
      <div className="content">
        <div className="content-row">
          <div className="col-item">
            <div className="tags">
              <span className="label">ID</span>
              <span className="value">{state.deliveryAgentId}</span>
            </div>
          </div>
          <div className="col-item">
            <div className="tags">
              <span className="label">Name: </span>
              <span className="value">{state.deliveryAgentName}</span>
            </div>
          </div>
        </div>
        <div className="content-row">
          <div className="col-item">
            <div className="tags">
              <span className="label">Email</span>
              <span className="value">198deepak@gmail.com</span>
            </div>
          </div>
          <div className="col-item">
            <div className="tags">
              <span className="label">Contacts: </span>
              <span className="value">+91 7860965109, +91 7355986157</span>
            </div>
          </div>
        </div>
        <div className="content-row">
          <div className="col-item">
            <div className="tags">
              <span className="label">Role: </span>
              <span className="value"> Delivery Agent</span>
            </div>
          </div>
          <div className="col-item">
            <div className="tags">
              <span className="label">Status: </span>
              <span className="value">
                {state.verStatus === 2 ? "Pending" : "Verified"}
              </span>
            </div>
          </div>
        </div>
        <div className="content-row">
          <div className="col-item">
            <div className="tags">
              <span className="label">Address: </span>
              <span className="value"> {state.deliveryAgentAddress}</span>
            </div>
          </div>
          <div className="col-item">
            <div className="tags">
              <span className="label">Status: </span>
              <span className="value">
                {state.verStatus === 2 ? "Pending" : "Verified"}
              </span>
            </div>
          </div>
        </div>
        <div className="content-row">
          <div className="col-item">
            <div className="tags">
              <span className="label">Aadhar Card: </span>
              <Button className="btn"> View Document</Button>
            </div>
          </div>
          <div className="col-item">
            <div className="tags">
              <span className="label">Pan Card: </span>
              <Button className="btn">View Document</Button>
            </div>
          </div>
        </div>
        <div className="btns">
        <Button className="btn" onClick={verifyAgentHandler}>
          {loading ? antIcon : "Verify"}
        </Button>
        <Button>Decline</Button>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
