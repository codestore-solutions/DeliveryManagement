import { FC } from "react";
import "./style.scss";
import { DownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { NotificationIcon } from "../../assets";
import { useAppSelector } from "../../store/hooks/app";
import { RootState } from "../../store";
import { AuthStateInterface } from "../../store/features/Auth/authSlice";
interface NavbarProps {}

const items: MenuProps["items"] = [
  {
    label: "1st menu item",
    key: "1",
  },
  {
    label: "2nd menu item",
    key: "2",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];
const Navbar: FC<NavbarProps> = () => {
  const {data} = useAppSelector((state:RootState) => state.auth) as AuthStateInterface;
  // const handleChange = (value: string | string[]) => {
  //   console.log(`Selected: ${value}`);
  // };
  return (
    <div id="navbar">
      <div className="nav-left">
        <p>Delivery Partner Management</p>
      </div>
      <div className="nav-right">
        <div className="nav-items">
          <div className="nav-item">
            {/* <span>Explore</span> */}
            <div className="notification">
              <img src={NotificationIcon} alt="" />
              <span className="status"></span>
            </div>
          </div>
          <div className="nav-item">
            <div className="avtar">
              <Avatar
                src={
                  <img
                    src={
                      "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000"
                    }
                    alt="avatar"
                    style={{ height: "35px", lineHeight: "35px" }}
                  />
                }
              />
                
                <Dropdown menu={{ items }} className="dropdown">
                <a onClick={(e) => e.preventDefault()}>
                  <Space style={{ height: "35px"}} >
                    <p className="tag">{data?.email}</p>
                  </Space>
                  <DownOutlined className="icon" />
                </a>
              </Dropdown>
               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
