import React, { useState, useEffect } from "react";
import "./style.scss";
import { LeftArrowIcon } from "../../assets";
import { Button, Col, Row } from "antd";
import { CustomTimeline } from "../../components";
import { useParams } from "react-router-dom";
import OrderService from "../../services/OrderService";
import Spinner from "../Spinner/Spinner";
import date from "../../utils/helpers/CustomizeDate";

const OrderDetails: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  // console.log("data", data);
  const getDetails = async (id: string | undefined) => {
    try {
      setLoading(true);
      const res = await OrderService.getOrderDetailsById(id);
      setData(res);
      setLoading(false);
    } catch (error) {
      // Handle the error here, e.g., log it or display an error message
      console.error("Error occurred while fetching order details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails(id);
  }, [id]);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div id="order-details">
        <div className="order-header">
          <div className="left">
            <img src={LeftArrowIcon} alt="" />
            <h3>Order Details </h3>
          </div>
          <div className="right">
            <Button
              type="primary"
              style={{
                height: "45px",
                backgroundColor: "#545BFC",
                padding: "10px 25px",
                fontWeight: "600",
                borderRadius: "15px",
              }}
            >
              Assign Agent
            </Button>
          </div>
        </div>
        <div className="order-details-content">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <div className="container">
                <h3>Order Details</h3>
                <div className="container-content">
                  <div className="container-row">
                    <span className="container-col">OrderId</span>
                    <p className="container-col dark overflow-text">
                      {data?.id ?? "#SDW123"}
                    </p>
                  </div>
                  <div className="container-row">
                    <span className="container-col">Date Added</span>
                    <span className="container-col dark">
                      {date.getDate(data?.createdAt) ?? "10/12/2022"}
                    </span>
                  </div>
                  <div className="container-row">
                    <span className="container-col">Payment Method</span>
                    <span className="container-col dark">
                      {data?.paymentMode ?? "paymentMode"}
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
                    <span className="container-col dark">Rajiv Sahu</span>
                  </div>
                  <div className="container-row">
                    <span className="container-col">Email</span>
                    <span className="container-col dark">
                      rajivsahu@gmsil.com
                    </span>
                  </div>
                  <div className="container-row">
                    <span className="container-col">Contacts</span>
                    <span className="container-col dark">7860965109</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <div className="container">
                <h3>Address</h3>
                <div className="container-content">
                  <div className="container-row">
                    <span className="container-col">Billing Address</span>
                    <p className="container-col sm dark">
                      {data?.shippingAddressId ??
                        "#Unit 1/23 Hastings Road, Melbourne 3000,Victoria"}
                    </p>
                  </div>
                  <div className="container-row">
                    <span className="container-col">Shipping Address</span>
                    <p className="container-col sm dark">
                      {data?.shippingAddressId ??
                        "#Unit 1/23 Hastings Road, Melbourne 3000,Victoria"}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="order-tracking">
          <div className="order-header">
            <div className="left">
              <h3>Status </h3>
            </div>
            <div className="right"></div>
          </div>
          <div className="timeline">
            <CustomTimeline />
          </div>
        </div>
      </div>
    );
  }
};

export default OrderDetails;
