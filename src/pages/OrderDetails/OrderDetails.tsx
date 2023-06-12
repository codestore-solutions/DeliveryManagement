import React from "react";
import "./style.scss";
import { useLocation } from "react-router-dom";
import { LeftArrowIcon } from "../../assets";
import { Button, Col, Row } from "antd";
import { CustomTimeline } from "../../components";
import date from '../../utils/helpers/CustomizeDate'
const OrderDetails: React.FC = () => {
  const location = useLocation();
  // const navigate = useNavigate();
 const {id, customer,paymentMode, createdAt} = location.state?.data;
 
 
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
                  <p className="container-col dark overflow-text">{id}</p>
                </div>
                <div className="container-row">
                  <span className="container-col">Date Added</span>
                  <span className="container-col dark">{date.getDate(createdAt)}</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Payment Method</span>
                  <span className="container-col dark">{paymentMode}</span>
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
                  <span className="container-col dark">{customer?.name}</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Email</span>
                  <span className="container-col dark">{customer.email}</span>
                </div>
                <div className="container-row">
                  <span className="container-col">Contacts</span>
                  <span className="container-col dark">{customer.contacts[0]} , {customer.contacts[1]}</span>
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
