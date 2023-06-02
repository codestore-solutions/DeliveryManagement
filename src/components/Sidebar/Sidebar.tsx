import { FC } from "react";
import "./style.scss";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import { Link, useLocation } from "react-router-dom";
import { LogoImg } from "../../assets";
import SubMenu from "antd/es/menu/SubMenu";

interface SidebarProps {
  menuItems: Array<any>;
  collapsed: boolean;
  setCollapsed: Function;
}

const Sidebar: FC<SidebarProps> = ({ menuItems, collapsed, setCollapsed }) => {
  const location = useLocation();
  const renderMenuItems = (menuItems: any) => {
    return menuItems.map((item: any) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title} className="ant-menu-item-group">
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      );
    });
  };
  return (
    <div className="sidebar">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="container"
      >
        <div
          className="demo-logo-vertical"
          onClick={() => setCollapsed(!collapsed)}
        >
          <img src={LogoImg} className={"img"} />
          <h3 className={collapsed ? "logo-tag-collapse" : "logo-tag"}>Logo</h3>
        </div>
        <Menu selectedKeys={["sidebar"]} mode="inline">
          {/* { menuItems.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      }}

        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))} */}
          {renderMenuItems(menuItems)}
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
