import { FC } from "react";
import "./style.scss";
import { DeliveryIcon } from "../../assets";
import { UserOutlined } from '@ant-design/icons';
interface NavbarProps {
  
}
const Navbar: FC<NavbarProps> = () => {
  return (
    <nav id="navbar">
      <div className="nav-left">
        <img src={DeliveryIcon} alt="logo"  />
        <span>AgentApp</span>
      </div>
      <div className="nav-right">
        <div className="nav-items">
        <div className="nav-item">
            {/* <span>Explore</span> */}
          </div>
          <div className="nav-item">
            <UserOutlined  className="user-icon"/>
            <span>Rahul Chaudhary</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
