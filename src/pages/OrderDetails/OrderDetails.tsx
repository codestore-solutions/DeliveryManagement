import React from "react";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Item1, Item2, LeftArrowIcon } from "../../assets";
import { Col, Row } from "antd";

const OrderDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  console.log("Dey", state);
  return (
    <div id="order-details">
      <div className="header">
        <img src={LeftArrowIcon} alt="" onClick={() => navigate("/dashboard/orders")} />
        <h3>Details</h3>
      </div>
      <div className="order-content">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
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
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
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
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
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
        <div className="order-items">
          <h3 className="heading">Orders</h3>
          <div className="items-container">
            <table className="item-table">
              <thead className="table-header">
                <th className="product-heading">Product</th>
                <th>SKU</th>
                <th>QTY</th>
                <th>UNIT PRICE</th>
                <th>TOTAL</th>
              </thead>
              <tbody className="table-body">
                <tr className="table-row">
                  <td className="table-product">
                    <div className="item-card">
                      <img src={Item1} alt="" />
                      <div className="desc">
                        <h4>Footwear</h4>
                        <span >Delivery Date: 19/05/2023</span>
                      </div>
                    </div>
                  </td>
                  <td>02494006</td>
                  <td>4</td>
                  <td>123 $</td>
                  <td>555 $</td>
                </tr>
                <tr className="table-row">
                  <td className="table-product">
                    <div className="item-card">
                      <img src={Item2} alt="" />
                      <div className="desc">
                        <h4>Smart Watch</h4>
                        <span >Delivery Date: 19/05/2023</span>
                      </div>
                    </div>
                  </td>
                  <td>02494006</td>
                  <td>4</td>
                  <td>123 $</td>
                  <td>555 $</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
