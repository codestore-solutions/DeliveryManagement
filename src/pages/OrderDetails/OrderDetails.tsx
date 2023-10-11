import React, { useState, useEffect } from "react";
import "./style.scss";
import { Col, Row } from "antd";
import { AgentFeedBack, CustomModal, CustomTimeline } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import OrderService from "../../services/OrderService";
import Spinner from "../Spinner/Spinner";
import date from "../../utils/helpers/CustomizeDate";
import AgentService from "../../services/AgentService";
import OrderDetailHeader from "../../components/OrderDetailHeader/OrderDetailHeader";
import SingleAssign from "../../components/SingleAssign/SingleAssign";
import useScreenWidth from "../../Hooks/ScreenWidthHook";

const OrderDetails: React.FC = () => {
  const navigate = useNavigate();
  const {isSmallScreen, isMiddleScreen} = useScreenWidth()
  const { id } = useParams();
  const [data, setData] = useState<any>();
  const [feedbackdata, setFeedbackData] = useState<any>();
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = (record: any) => {
    setSelectedRow(record);
    console.log("record", record);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const getDetails = async (id: string | undefined) => {
    try {
      setLoading(true);
      const { data, statusCode } = await OrderService.getOrderDetailsById(id);
      console.log("data", data);
      if (statusCode === 200) setData(data);
    } catch (error) {
      // Handle the error here, e.g., log it or display an error message
      console.error("Error occurred while fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };
  const getfeedbackDetails = async (id: number | undefined) => {
    try {
      setLoading(true);
      const res = await AgentService.getFeedbackDetails(id);
      setFeedbackData(res);
      setLoading(false);
    } catch (error) {
      console.error("Error occurred while fetching order details:", error);
      setLoading(false);
    }
  };
  function goBack() {
    navigate(-1);
  }

  

  useEffect(() => {
    getDetails(id);
    if (data?.orderStatus === 1) getfeedbackDetails(6);
  }, [id]);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div id="order-details">
        <OrderDetailHeader
          goBack={goBack}
          data={data}
          handleOpenModal={handleOpenModal}
        />
        <div className="order-details-content">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <div className="container">
                <h3>Order Details</h3>
                <div className="container-content">
                  <div className="container-row">
                    <span className="container-col">OrderId</span>
                    <p className="container-col dark">{data?.id ?? " "}</p>
                  </div>
                  <div className="container-row">
                    <span className="container-col">Date Added</span>
                    <span className="container-col dark">
                      {date.getDate(data?.createdAt) ?? " "}
                    </span>
                  </div>
                  <div className="container-row">
                    <span className="container-col">Payment Method</span>
                    <span className="container-col dark">
                      {data?.paymentMode === 1 ? (
                        <p className="available">online</p>
                      ) : (
                        <p className="offline">COD</p>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <div className="container">
                <h3>Customer Details</h3>
                <div className="container-content">
                  <div className="container-row">
                    <span className="container-col">Name</span>
                    <span className="container-col dark">
                      {data?.customer?.name}
                    </span>
                  </div>
                  <div className="container-row">
                    <span className="container-col">Email</span>
                    <span className={isSmallScreen || isMiddleScreen ? 'container-col dark hidden': 'container-col dark'}>
                      {data?.customer?.email}
                    </span>
                  </div>
                  <div className="container-row">
                    <span className="container-col">Contacts</span>
                    <span className="container-col dark">
                      {data?.shippingAddress?.phoneNumber}
                    </span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <div className="container">
                <h3>Address</h3>
                <div className="container-content">
                  <div className="container-row">
                    <span className="container-col">User Address</span>
                    <p className="container-col sm dark">
                      {"  " +
                        data?.shippingAddress?.street +
                        " " +
                        data?.shippingAddress?.city +
                        " " +
                        data?.shippingAddress?.country}
                    </p>
                  </div>
                  <div className="container-row">
                    <span className="container-col">Vendor Address</span>
                    <p className="container-col sm dark">
                      {data?.vendor?.business?.address?.street +
                        " " +
                        data?.vendor?.business?.address?.city +
                        " " +
                        data?.vendor?.business?.address?.country}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="order-tracking">
          {data?.orderStatus >= 6 && (
            <>
              <div className="order-header">
                <div className="left">
                  <h3>Status </h3>
                </div>
                <div className="right"></div>
              </div>
              <div className="timeline">
                <CustomTimeline id={data?.id} />
              </div>
            </>
          )}
          <div className="timeline">
            {data?.orderStatus === 11 && feedbackdata && (
              <>
                <h2
                  style={{
                    padding: "15px 0",
                    fontSize: "20px",
                    letterSpacing: "0.02em",
                  }}
                >
                  Feedback for Delivery Agent
                </h2>
                <div className="box">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <AgentFeedBack
                      rating={feedbackdata?.rating}
                      comment={feedbackdata?.comment}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <CustomModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          component={
            <SingleAssign
              selectedRow={selectedRow}
              handleCloseModal={handleCloseModal}
              isOpen={isOpen}
            />
          }
          width={600}
        />
      </div>
    );
  }
};

export default OrderDetails;