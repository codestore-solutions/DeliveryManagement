import { FC, useState } from "react";
import { Navbar } from "../../components";

import "./style.scss";
import { useNavigate } from "react-router-dom";

interface LandingPageProps {}
interface userIntrface {
  email: string;
  password: string;
}
const LandingPage: FC<LandingPageProps> = () => {
  const navigation = useNavigate();
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
    navigation(`/dashboard/admin`);
  };
  return (
    <div id="landingPage">
      <Navbar />
      <div className="container">
        <form action="" id="login-form" onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
