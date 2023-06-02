import { FC, useState } from "react";
import { Tabs } from "antd";
import "./style.scss";
import { AssignedOrders, AvailableOrders, CompletedOrders } from "../../components";

const { TabPane } = Tabs;

interface OrderProps {}

const Orders: FC<OrderProps> = () => {
  const [activeTab, setActiveTab] = useState("0");

  const handleTabChange = (tabKey: any) => {
    setActiveTab(tabKey);
  };
  return (
    <div id="orders">
      <h3 className="heading">Orders List</h3>
      <div className="content">
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="Available Orders" key="0">
            <AvailableOrders />
          </TabPane>
          <TabPane tab="Assigned Orders" key="1">
            <AssignedOrders />
          </TabPane>
          <TabPane tab="Completed Orders" key="2">
            <CompletedOrders />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;
