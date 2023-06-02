import { Tabs } from 'antd';
import {useState} from 'react'
import DeliveryAgents from './DeliveryAgents';
import { AssignedAgents } from '..';
import './style.scss'
const { TabPane } = Tabs;
const Agent = () => {
    const [activeTab, setActiveTab] = useState("0");

    const handleTabChange = (tabKey: any) => {
      setActiveTab(tabKey);
    };
  return (
    <div id="available-list">
      <h3 className="heading">Agents List</h3>
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