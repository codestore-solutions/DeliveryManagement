import React, { useState, useEffect } from "react";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckTick, StatusTick } from "../../assets";
import { Row, Col, Typography, Switch, message } from "antd";
import AgentService from "../../services/AgentService";
import Spinner from "../Spinner/Spinner";
import { getVehicleLabel } from "../../utils/helpers/GetLabelByValue";
import AgentInfoCard from "../../components/AgentInfoCard/AgentInfoCard";
import DeliveryStatusCard from "../../components/AgentStatusCard/AgentStatusCard";
import { ApiConstants } from "../../constants/ApiConstants";
import { verifyAgentKycInterface } from "../../utils/types";
import { AgentDetailHeader } from "../../components";
import LocationCard from "../../components/LocationCard/LocationCard";
const { Title } = Typography;

const AgentDetails: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [orderStatusCount, setOrderStatusCount] = useState<any>(null);
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
    navigate(-1);
  }

  const getOrderStatusCount = async (id: number) => {
    try {
      const { statusCode, data } = await AgentService.acceptRejectOrders(id);
      if (statusCode === ApiConstants.successCode) {
        setOrderStatusCount(data);
      }
    } catch (err) {
      console.log("Order Status Count Error", err);
    }
  };
  const onChange = (checked: boolean) => {
    let payload: verifyAgentKycInterface = {
      agentId: id,
      verificationStatus: checked ? 1 : 0,
    };
    AgentService.verifyAgentKyc(payload).then((res) => {
      if (res?.statusCode === ApiConstants.successCode) {
        message.success(res?.message);
      }
    });
  };

   
  useEffect(() => {
    fetchAgentDetails(Number(id));
    getOrderStatusCount(Number(id));
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div id="agent-details">
      <AgentDetailHeader data={data} goBack={goBack} />
      <Row gutter={[16, 16]}>
        <AgentInfoCard
          title="Personal Details"
          data={{
            Name: data?.fullName,
            "Email Id": data?.email,
            "Mobile Number": data?.phoneNumber,
            "Res. Address": data?.address,
            "Verify Agent": (
              <Switch
                defaultChecked={data?.verificationStatus === 1 ? true : false}
                onChange={onChange}
              />
            ),
          }}
        />
        <AgentInfoCard
          title="Vehicle Details"
          data={{
            "Registration Number": data?.vehicleDetails.registrationNumber,
            "Vehicle Model": data?.vehicleDetails.vehicleModel,
            "Vehicle Company": data?.vehicleDetails.company,
            "Manufactured Year": data?.vehicleDetails.manufacturedYear,
            "Vehicle Type": getVehicleLabel(data?.vehicleDetails?.vehicleType),
          }}
        />
      </Row>
      {/* Add Vehicle Details Container */}
      <Row
        gutter={[16, 16]}
        style={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <AgentInfoCard
          title="Bank Details"
          data={{
            "AccountHolder Name": data?.bankDetails?.accountHolderName,
            IFSC: data?.bankDetails?.ifscCode,
            "A/C Number": data?.bankDetails?.accountNumber,
            Bank: data?.bankDetails?.bankName,
          }}
        />
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className="card-container">
            <h3>Working Locations</h3>
            <div
              className="container-content"
              style={{ maxHeight: "11rem", overflow: "scroll" }}
            >
              {data?.serviceLocations.map((location: any) => (
                <LocationCard location={location} />
              ))}
            </div>
          </div>
        </Col>
        {/* <AgentVerifyCard agentId={id} /> */}
      </Row>

      <Title level={4}>Working History</Title>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ padding: "0 6px" }}
      >
        <DeliveryStatusCard
          icon={CheckTick}
          value={orderStatusCount?.deliveredOrdersCount}
          label="Delivered"
        />
        <DeliveryStatusCard
          icon={StatusTick}
          value={orderStatusCount?.rejectedOrdersCount}
          label="Rejected"
          iconClassName="status-tick"
        />
        {/* <DeliveryStatusCard
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
        /> */}
      </Row>
    </div>
  );
};

export default AgentDetails;
