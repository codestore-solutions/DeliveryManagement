import { FC } from "react";
import "./style.scss";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import { Link, useLocation } from "react-router-dom";
import { DashboardIcon } from "../../assets";

interface SidebarProps {
  menuItems: Array<any>;
  collapsed: boolean;
  setCollapsed: Function;
}

const Sidebar: FC<SidebarProps> = ({ menuItems, collapsed, setCollapsed }) => {
  const location = useLocation();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="sidebar"
      style={{ overflow: "auto", height: "90vh" }}
      theme="dark"
    >
      <div className="logo" onClick={() => setCollapsed(!collapsed)}>
        <img
          src={DashboardIcon}
          className={collapsed ? "collapse-img" : "img"}
        />
        <h3 className={collapsed ? "logo-tag-collapse" : "logo-tag"}>
          Services
        </h3>
      </div>
      <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline">
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
