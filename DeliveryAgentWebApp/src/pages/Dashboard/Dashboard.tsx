import React, { useState } from 'react';
import {
  DeliveredProcedureOutlined,
  SettingOutlined,
  UserAddOutlined,
  UnorderedListOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout } from 'antd';

import './style.scss';
import { Routes, Route, } from 'react-router-dom';
import DeliveryAgents from '../DeliveryAgents/DeliveryAgents';
import { Navbar, Sidebar } from '../../components';
import { AgentDetails, AssignedAgents, Management, OrderDetails, Orders, Profile } from '..';
import {DashboardImg} from '../../assets'
const { Header, Content } = Layout;



const menuItems = [
  {
    key: '1',
    icon: <img src={DashboardImg} alt="" width={20} height={20} />,
    label: 'Dashboard',
    path: '/dashboard/management',
  },
  {
    key: 'Sub 1',
    icon: <DeliveredProcedureOutlined />,
    title: 'Agents',
    children:[
       {
        key: '2',
        label: 'Agents List',
        path: '/dashboard/agents',
       },
       {
        key: '3',
        label: 'Assigned Agents',
        path: '/dashboard/assigned-agents',
       },
    ]
  },
  {
    key: '4',
    icon: <UnorderedListOutlined />,
    label: 'Orders',
    path: '/dashboard/orders',
  },
  {
    key: '5',
    icon: <UserAddOutlined />,
    label: 'Profile',
    path: '/dashboard/profile',
  },
  {
    key: '6',
    icon: <SettingOutlined />,
    label: 'Settings',
    path: '/settings',
  },
  {
    key: '7',
    icon: <LogoutOutlined />,
    label: 'Logout',

  },
];
const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout id='dashboard'>
       <Sidebar menuItems={menuItems} collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
      <Header className='header'>
        <Navbar />
      </Header>
        <Content
          className='content'
        >
          <Routes>
          <Route path='/management' element={<Management />} />
            <Route path='/agents' element={<DeliveryAgents />} />
            <Route path='/agent-details/:id' element={<AgentDetails />} />
            <Route path='/assigned-agents' element={<AssignedAgents />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;