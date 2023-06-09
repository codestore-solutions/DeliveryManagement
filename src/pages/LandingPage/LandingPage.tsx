import { FC, useState } from 'react';
import { Navbar } from "../../components";
import "./style.scss";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import { AuthStateInterface, loginUser, userSelector } from "../../store/features/Auth/authSlice";
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ color: "#fff" }} spin />;

interface userIntrface {
  email: string;
  password: string;
}
const LandingPage: FC = () => {
  const dispatch = useAppDispatch()
  const {loading, isAuthenticated} = useAppSelector(userSelector) as AuthStateInterface;
  console.log("loa", loading, isAuthenticated);
  const [formData, setFormData] = useState<userIntrface>({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let payload = {
      username: formData.email,
      password: formData.password,
    };
    dispatch(loginUser({payload}))
  };
  
  return (
    <div id="landingPage">
      <Navbar />
      <div className="container">
        <form action="" id="login-form">
          <div className="form-element">
            <label htmlFor="email">Username or Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-element">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <Button type="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? antIcon : "Login"}
            </Button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
