import { FC } from "react";
import "./style.scss";
import { Image, Layout, Menu, Typography } from "antd";
const { Sider } = Layout;
import { Link, } from "react-router-dom";
import { LogoImg } from "../../assets";
import SubMenu from "antd/es/menu/SubMenu";
import { reset } from "../../store/features/Auth/authSlice";
import { useAppDispatch } from "../../store/hooks/app";

const {Title} = Typography

interface SidebarProps {
  menuItems: Array<any>;
  collapsed: boolean;
  setCollapsed: Function;
}

const Sidebar: FC<SidebarProps> = ({ menuItems, collapsed, setCollapsed }) => {
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
     dispatch(reset());
  };
  const renderMenuItems = (menuItems: any) => {
    return menuItems.map((item: any) => {
      if (item.children) {
        return (
          <SubMenu
            key={item.key}
            icon={item.icon}
            title={item.title}
            className="ant-menu-item-group"
          >
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      }

      return item.key === "6" ? (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          onClick={() => logoutHandler()}
        >
          <span>{item.label}</span>
        </Menu.Item>
      ) : (
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
          <Image preview={false} src={LogoImg} className={"img"} />
          <Title level={3} className={collapsed ? "logo-tag-collapse" : "logo-tag"}>Logo</Title>
        </div>
        <Menu selectedKeys={["sidebar"]} mode="inline">
          {renderMenuItems(menuItems)}
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
