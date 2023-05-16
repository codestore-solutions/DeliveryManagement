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
import { Orders, Profile } from '..';

const { Header, Content } = Layout;

const menuItems = [
  {
    key: '1',
    icon: <DeliveredProcedureOutlined />,
    label: 'Agents',
    path: '/dashboard/agents',
  },
  {
    key: '2',
    icon: <UnorderedListOutlined />,
    label: 'Orders',
    path: '/dashboard/orders',
  },
  {
    key: '3',
    icon: <UserAddOutlined />,
    label: 'Profile',
    path: '/dashboard/profile',
  },
  {
    key: '4',
    icon: <SettingOutlined />,
    label: 'Settigns',
    path: '/settings',
  },
  {
    key: '5',
    icon: <LogoutOutlined />,
    label: 'Logout',

  },
];
const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout id='dashboard'>
      <Header style={{ padding: 0, position: "sticky", top: "0", borderBottom: "1px solid grey", }}>
        <Navbar />
      </Header>
      <Layout>
        <Sidebar menuItems={menuItems} collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            height: "85vh",
            margin: '24px 16px 0', overflowY: 'scroll'
          }}
        >
          <Routes>
            <Route path='/agents' element={<DeliveryAgents />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;