import { FC, useState } from "react";
import { Tabs } from "antd";
import "./style.scss";
import { AssignedOrders, AvailableOrders, CompletedOrders } from "../../components";
import { FilterIcon } from "../../assets";

const { TabPane } = Tabs;

interface OrderProps {}

const Orders: FC<OrderProps> = () => {
  const [activeTab, setActiveTab] = useState("0");

  const handleTabChange = (tabKey: any) => {
    setActiveTab(tabKey);
  };
  return (
    <div id="available-list">
       <div className="agent-header">
         <div className="header-left">
         <h3>Delivery Request Management</h3>
         </div>
         <div className="header-right">
             <div className="search-box">
                 <input type="text" placeholder='Search' />
             </div>
             <div className="filter-btn">
             <img src={FilterIcon}  alt=''/>
             </div>
         </div>
      </div>
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
