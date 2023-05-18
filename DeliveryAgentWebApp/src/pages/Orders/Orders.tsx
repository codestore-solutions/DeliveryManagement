import { FC } from "react";

import "./style.scss";
import { AssignedOrders, AvailableOrders } from "../../components";
interface OrderProps {}

const Orders: FC<OrderProps> = () => {
  return (
    <div id="orders">
      <h3 className="heading"> Available Orders List</h3>

      <div>
        <AvailableOrders />

        {/* <Col span={11}> 
            <h3 style={{color:"grey", letterSpacing:0.02, padding:"10px 0"}}>Assigned Orders List</h3>
              <AssignedOrders />
            </Col> */}
      </div>
    </div>
  );
};

export default Orders;
