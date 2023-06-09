import { Tabs } from 'antd';
import {useState} from 'react'
import DeliveryAgents from './DeliveryAgents';
import { AssignedAgents } from '..';
import './style.scss'
import { AddIcon, FilterIcon } from '../../assets';
const { TabPane } = Tabs;
const Agent = () => {
    const [activeTab, setActiveTab] = useState("0");
    const handleTabChange = (tabKey: any) => {
      setActiveTab(tabKey);
    };
  return (
    <div id="available-list">
      <div className="agent-header">
         <div className="header-left">
         <h3>Delivery Partner Management</h3>
         </div>
         <div className="header-right">
             <div className="search-box">
                 <input type="text" placeholder='Search' />
             </div>
             <div className="add-btn">
                <img src={AddIcon}  alt=''/>
             </div>
             <div className="filter-btn">
             <img src={FilterIcon}  alt=''/>
             </div>
         </div>
      </div>
    <div className="content">
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="All Agents" key="0">
             <DeliveryAgents />
          </TabPane>
          <TabPane tab="Assigned Agents" key="1">
            <AssignedAgents />
          </TabPane>
        </Tabs>
      </div>
  </div>
  )
}

export default Agent