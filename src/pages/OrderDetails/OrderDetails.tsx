import React from "react";
import "./style.scss";
import { useLocation } from "react-router-dom";
import { LeftArrowIcon } from "../../assets";
import { Button, Col, Row } from "antd";
import { CustomTimeline } from "../../components";

const OrderDetails: React.FC = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const state = location.state;
  console.log("Dey", state);
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
                  <span className="container-col dark">#nkjanbcksc</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Date Added</span>
                  <span className="container-col dark">19/05/2023</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Payment Method</span>
                  <span className="container-col dark">Online</span>
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
                  <span className="container-col dark">Dan Wilsoi</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Email</span>
                  <span className="container-col dark">dan@consulting.com</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Contacts</span>
                  <span className="container-col dark">+6141 234 567</span>
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
                    #Unit 1/23 Hastings Road, Melbourne 3000,Victoria,
                    Australia.
                  </p>
                </div>
                <div className="container-row">
                  <span className="container-col">Shipping Address</span>
                  <p className="container-col sm dark">
                    Unit 1/23 Hastings Road, Melbourne 3000,Victoria, Australia.
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
              Live Track
            </Button>
          </div>
        </div>
        <div className="timeline">
          <CustomTimeline />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
