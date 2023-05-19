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
import { AssociatedAgents, Orders, Profile } from '..';

const { Header, Content } = Layout;



const menuItems = [
  {
    key: 'Sub 1',
    icon: <DeliveredProcedureOutlined />,
    title: 'Agents',
    children:[
       {
        key: '1',
        label: 'Available Agents',
        path: '/dashboard/agents',
       },
       {
        key: '2',
        label: 'Agent Association',
        path: '/dashboard/associatedAgents',
       },
    ]
  },
  {
    key: '3',
    icon: <UnorderedListOutlined />,
    label: 'Orders',
    path: '/dashboard/orders',
  },
  {
    key: '4',
    icon: <UserAddOutlined />,
    label: 'Profile',
    path: '/dashboard/profile',
  },
  {
    key: '5',
    icon: <SettingOutlined />,
    label: 'Settigns',
    path: '/settings',
  },
  {
    key: '6',
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
            <Route path='/agents' element={<DeliveryAgents />} />
            <Route path='/associatedAgents' element={<AssociatedAgents />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;