import React, { useState, lazy, useEffect } from "react";
import {
  DeliveredProcedureOutlined,
  UserAddOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";

import "./style.scss";
import { Routes, Route } from "react-router-dom";
import { Navbar, Sidebar } from "../../components";

const AgentDetails = lazy(() => import("../AgentDetails/AgentDetails"));
const Agents = lazy(() => import("../DeliveryAgents/Agent"));
const Management = lazy(() => import("../Dashboard/Management"));
const AssignedAgents = lazy(() => import("../DeliveryAgents/AssignedAgents"));
const Orders = lazy(() => import("../Orders/Orders"));
const Profile = lazy(() => import("../Profile/Profile"));
const TrackOrder = lazy(() => import("../TrackOrder/TrackOrder"));
const OrderDetails = lazy(() => import("../OrderDetails/OrderDetails"));

import { DashboardImg } from "../../assets";
import useScreenWidth from "../../Hooks/ScreenWidthHook";

const { Content } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
 const { screenWidth, isMiddleScreen } = useScreenWidth();
  const menuItems = [
    {
      key: "1",
      icon: <img src={DashboardImg} alt="" width={20} height={20} />,
      label: "Dashboard",
      path: "/dashboard/management",
    },
    {
      key: "2",
      icon: <DeliveredProcedureOutlined width={20} height={20} />,
      label: "Agents",
      path: "/dashboard/agents",
    },
    {
      key: "3",
      icon: <UnorderedListOutlined width={20} height={20} />,
      label: "Orders",
      path: "/dashboard/orders",
    },
    {
      key: "4",
      icon: <UserAddOutlined width={20} height={20} />,
      label: "Profile",
      path: "/dashboard/profile",
    },
    // {
    //   key: "5",
    //   icon: <SettingOutlined />,
    //   label: "Settings",
    //   path: "/settings",
    // },
    {
      key: "6",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];
  useEffect(() => {
    if (isMiddleScreen) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screenWidth]);
  return (
    <Layout id="dashboard">
      <Sidebar
        menuItems={menuItems}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <Layout>
        <Navbar />
        <Content className="content">
          <Routes>
            <Route path="/management" element={<Management />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/agent-details/:id" element={<AgentDetails />} />
            <Route path="/assigned-agents" element={<AssignedAgents />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            <Route path="/track-order/:id" element={<TrackOrder />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
