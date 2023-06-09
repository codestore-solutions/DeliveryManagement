import React from "react";
import "./style.scss";
// import { useLocation } from "react-router-dom";
// import AgentServices from "../../services/AgentServices";
// import { LoadingOutlined } from "@ant-design/icons";
import {
  BusyIcon,
  CheckTick,
  DeleteIcon,
  EditIcon,
  LeftArrowIcon,
  RejectedIcon,
  StatusTick,
  TimeTick,
} from "../../assets";
import { Col, Row } from "antd";

// const antIcon = <LoadingOutlined style={{ color: "#fff" }} spin />;
const AgentDetails: React.FC = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  // const location = useLocation();
  // const state = location.state;
  // console.log("Dey", state)
  // const verifyAgentHandler = async () => {
  //   let instance = AgentServices.getInstance();
  //   setLoading(true);
  //   instance.verifyAgent(state.deliveryAgentId, 1).then((res) => {
  //     if (res) setLoading(false);
  //   });
  // };

  return (
    <div id="agent-details">
      <div className="agent-header">
        <div className="left">
          <img src={LeftArrowIcon} alt="" />
          <h3>Delivery Partner Details </h3>
        </div>
        <div className="right">
          <div className="status">
            <span className="tag">Status:</span>
            <span className="tag value">Busy</span>
          </div>
          <div className="icons">
            <img src={BusyIcon} alt="" className="badge-icons" />
            <img src={EditIcon} alt="" className="badge-icons" />
            <img src={DeleteIcon} alt="" className="badge-icons" />
          </div>
        </div>
      </div>
      <div className="agent-details-content">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <div className="card-container">
              <h3>Personal Details</h3>
              <div className="container-content">
                <div className="container-row">
                  <span className="container-col">Name</span>
                  <span className="container-col dark">Raju Kumar</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Email Id</span>
                  <span className="container-col dark">198raju@gmail.com</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Mobile Number</span>
                  <span className="container-col dark">+1 12345-09876</span>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            {/* Content for column 2 */}
            <div className="card-container">
              <h3>Joining Details</h3>
              <div className="container-content">
                <div className="container-row">
                  <span className="container-col">Unique ID</span>
                  <span className="container-col dark">Raju Kumar</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Joining Date</span>
                  <span className="container-col dark">10/12/2022</span>
                </div>
                <div className="container-row">
                  <span className="container-col">DL Number</span>
                  <span className="container-col dark">GARSK12746239DH</span>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            {/* Content for column 3 */}
            <div className="card-container">
              <h3>Personal Details</h3>
              <div className="container-content">
                <div className="container-row">
                  <span className="container-col">Name</span>
                  <span className="container-col dark">Raju Kumar</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Email Id</span>
                  <span className="container-col dark">198raju@gmail.com</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Mobile Number</span>
                  <span className="container-col dark">+1 12345-09876</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* Add Vechile Details Container */}
        <div className="vechile-details">
          <h3>Vechile Details</h3>
          <div className="details">
            <span className="details-item">
              Vehicle Number : <span className="dark">UP24 ED 1234</span>{" "}
            </span>
            <span className="details-item">
              Vehicle Number : <span className="dark">UP24 ED 1234</span>{" "}
            </span>
            <span className="details-item">
              Vehicle Number : <span className="dark">UP24 ED 1234</span>{" "}
            </span>
            <span className="details-item">
              Vehicle Number : <span className="dark">UP24 ED 1234</span>{" "}
            </span>
          </div>
        </div>
        <div className="vechile-details">
          <h3>Wallet Details</h3>
          <div className="details">
            <span className="details-item">
              Wallet Balance : <span className="dark">456 Inr</span>{" "}
            </span>
            <span className="details-item">
              Carryover Limit : <span className="dark"> 3456 Inr</span>{" "}
            </span>
            <span className="details-item">
              Carryover Amount : <span className="dark"> 3456 Inr</span>{" "}
            </span>
          </div>
        </div>
        <div className="delivery-report">
          <h3>Delivery Status</h3>
          <div className="conatiner-content">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                <div className="container">
                  <img src={CheckTick} alt="" />
                  <div className="details">
                    <h3>300</h3>
                    <span>Delivered</span>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                <div className="container">
                  <img src={StatusTick} alt="" className="status-tick" />
                  <div className="details">
                    <h3>300</h3>
                    <span>Cancelled</span>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                <div className="container">
                  <img src={RejectedIcon} alt="" className="reject-tick" />
                  <div className="details">
                    <h3>300</h3>
                    <span>Rejected</span>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                <div className="container">
                  <img src={TimeTick} alt="" className="time-tick" />
                  <div className="details">
                    <h3>7 hrs</h3>
                    <span>Online Hours</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
