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
import { Row , Col, Typography} from "antd";
import AgentService from "../../services/AgentService";
import Spinner from "../Spinner/Spinner";
import { getVehicleLabel } from "../../utils/helpers/GetLabelByValue";
import AgentInfoCard from "../../components/AgentInfoCard/AgentInfoCard";
import DeliveryStatusCard from "../../components/AgentStatusCard/AgentStatusCard";
import AgentVerifyCard from "../../components/AgentVerifyCard/AgentVerifyCard";
import { ApiConstants } from "../../constants/ApiConstants";
const {Text}  = Typography;
// const antIcon = <LoadingOutlined style={{ color: "#fff" }} spin />;
const AgentDetails: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [orderStatusCount, setOrderStatusCount] = useState<any>(null);
  console.log("data", data);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const id = location.state?.agentId;

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

  const getOrderStatusCount = async(id: number)=>{
    try {
      const {statusCode, data} = await AgentService.acceptRejectOrders(id);
      if(statusCode === ApiConstants.successCode){
         setOrderStatusCount(data);
      }
    } catch (err) {
       console.log('Order Status Count Error', err)
    }
  }
  useEffect(() => {
    fetchAgentDetails(Number(id));
    getOrderStatusCount(Number(id));
  }, []);

  if (loading) {
    return <Spinner />;
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
          <AgentInfoCard
            title="Personal Details"
            data={{
              Name: data?.fullName,
              "Email Id": data?.email,
              "Mobile Number": data?.phoneNumber,
              "Res. Address": data?.address,
            }}
          />
          <AgentInfoCard
            title="Vehicle Details"
            data={{
              "Registration Number": data?.vehicleDetails.registrationNumber,
              "Vehicle Model": data?.vehicleDetails.vehicleModel,
              "Vehicle Company": data?.vehicleDetails.company,
              "Manufactured Year": data?.vehicleDetails.manufacturedYear,
              "Vehicle Type": getVehicleLabel(
                data?.vehicleDetails?.vehicleType
              ),
            }}
          />
          <AgentInfoCard
            title="Bank Details"
            data={{
              "AccountHolder Name": data?.bankDetails?.accountHolderName,
              IFSC: data?.bankDetails?.ifscCode,
              "A/C Number": data?.bankDetails?.accountNumber,
              Bank: data?.bankDetails?.bankName,
            }}
          />
        </Row>
        {/* Add Vehicle Details Container */}
        <Row gutter={[16, 16]} style={{paddingTop:'10px', paddingBottom:'10px'}} >
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="card-container">
              <h3>Other Details</h3>
              <div className="container-content">
                <div className="container-row">
                  <Text className="container-col">Region</Text>
                  <span className="container-col dark">Delhi</span>
                </div>
                <div className="container-row">
                  <Text className="container-col">Total Earning</Text>
                  <Text type="success">14580</Text>
                </div>
                <div className="container-row">
                  <span className="container-col">Status</span>
                  <Text type="warning">Busy</Text>
                </div>
              </div>
            </div>
          </Col>
          <AgentVerifyCard agentId={id} />
        </Row>
        
        <div className="delivery-report">
          <h3>Delivery Status</h3>
          <div className="conatiner-content">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <DeliveryStatusCard
                icon={CheckTick}
                value={orderStatusCount?.deliveredOrdersCount}
                label="Delivered"
              />
              <DeliveryStatusCard
                icon={StatusTick}
                value='300'
                label="Cancelled"
                iconClassName="status-tick"
              />
              <DeliveryStatusCard
                icon={RejectedIcon}
                value={orderStatusCount?.rejectedOrdersCount}
                label="Rejected"
                iconClassName="reject-tick"
              />
              <DeliveryStatusCard
                icon={TimeTick}
                value="7 hrs"
                label="Online Hours"
                iconClassName="time-tick"
              />
              <DeliveryStatusCard
                icon={TimeTick}
                value="1500"
                label="Feedback Received"
                iconClassName="time-tick"
              />
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
