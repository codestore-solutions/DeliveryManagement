import React, { useState, useEffect } from "react";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
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
import AgentService from "../../services/AgentService";
import Spinner from "../Spinner/Spinner";
import CustomizeDate from "../../utils/helpers/CustomizeDate";

// const antIcon = <LoadingOutlined style={{ color: "#fff" }} spin />;
const AgentDetails: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  console.log('data', data);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const id = location.state?.personalDetails?.agentId;
  // console.log("Dey", state)
  // const verifyAgentHandler = async () => {
  //   let instance = AgentServices.getInstance();
  //   setLoading(true);
  //   instance.verifyAgent(state.deliveryAgentId, 1).then((res) => {
  //     if (res) setLoading(false);
  //   });
  // };
  const fetchAgentDetails = async (id: number) => {
    try {
      setLoading(true);
      const { data, statusCode } = await AgentService.getAgentDetails(id);
      if (statusCode === 200) setData(data);
    } catch (err) {
      console.log("Agent Details fetching  Error", err);
    } finally {
      setLoading(false);
    }
  };
  function goBack() {
    navigate(-1); // This will navigate one step back in the history stack.
  }
  useEffect(() => {
    fetchAgentDetails(Number(id));
  }, []);
  
   if(loading){
     return <Spinner />
   }
  return (
    <div id="agent-details">
      <div className="agent-header">
        <div className="left">
        <span onClick={goBack}>
            <img src={LeftArrowIcon} alt="" />
            </span>
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
                  <span className="container-col dark">{data?.personalDetails?.fullName}</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Email Id</span>
                  <span className="container-col dark">{data?.personalDetails?.email}</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Mobile Number</span>
                  <span className="container-col dark">{data?.personalDetails?.phoneNumber}</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Res. Address</span>
                  <span className="container-col dark">
                   {data?.personalDetails?.address}
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            {/* Content for column 2 */}
            <div className="card-container">
              <h3>Joining Details</h3>
              <div className="container-content">
                <div className="container-row">
                  <span className="container-col">Unique ID</span>
                  <span className="container-col dark">{data?.personalDetails?.deliveryAgentId}</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Joining Date</span>
                  <span className="container-col dark">{CustomizeDate.getDate(data?.personalDetails?.dateOfBirth)}</span>
                </div>
                <div className="container-row">
                  <span className="container-col">DL Number</span>
                  <span className="container-col dark">GARSK12746239DH</span>
                </div>
                
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            {/* Content for column 3 */}
            <div className="card-container">
              <h3>Bank Details</h3>
              <div className="container-content">
                <div className="container-row">
                  <span className="container-col">IFSC</span>
                  <span className="container-col dark">{data?.bankDetails?.ifscCode}</span>
                </div>
                <div className="container-row">
                  <span className="container-col">A/C Number</span>
                  <span className="container-col dark">{data?.bankDetails?.accountNumber}</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Branch</span>
                  <span className="container-col dark">{data?.bankDetails?.bankName}</span>
                </div>
               
              </div>
            </div>
          </Col>                                                    
        </Row>
        {/* Add Vechile Details Container */}
        <div className="vechile-details">
          <h3>Vehicle Details</h3>
          <div className="details">
            <span className="details-item">
            ManufacturedYear : <span className="dark">{data?.vehicleDetails?.manufacturedYear}</span>{" "}
            </span>
            <span className="details-item">
              Registration Number : <span className="dark">{data?.vehicleDetails?.registrationNumber}</span>{" "}
            </span>
            <span className="details-item">
             VehicleType : <span className="dark">{data?.vehicleDetails?.vehicleType}</span>{" "}
            </span>
            <span className="details-item">
              Vehicle Model : <span className="dark">{data?.vehicleDetails?.vehicleModel}</span>{" "}
            </span>
            <span className="details-item">
              Vehicle Company : <span className="dark">{data?.vehicleDetails?.company}</span>{" "}
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
              <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                <div className="container">
                  <img src={TimeTick} alt="" className="time-tick" />
                  <div className="details">
                    <h3>1500</h3>
                    <span>Feedback Received</span>
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
