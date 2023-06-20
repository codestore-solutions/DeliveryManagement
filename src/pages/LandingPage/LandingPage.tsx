import { FC, useState } from "react";
// import { Navbar } from "../../components";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import {
  AuthStateInterface,
  loginUser,
  userSelector,
} from "../../store/features/Auth/authSlice";
import { Button, Form, Input } from "antd";



const LandingPage: FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { loading, isAuthenticated } = useAppSelector(
    userSelector
  ) as AuthStateInterface;
  console.log("loa", loading, isAuthenticated);

  const [submitting, setSubmitting] = useState(false); 

  const handleSubmit = async (values: any) => {
    try {
      setSubmitting(true); // Set submitting state to true
      let payload = {
        username: values.email,
        password: values.password,
      };
      await dispatch(loginUser({ payload })); // Dispatch the login action
      // Reset the form fields
      form.resetFields();
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setSubmitting(false); // Set submitting state to false
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div id="landingPage">
      {/* <Navbar /> */}
      <div className="container">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email or username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit"  loading={submitting}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LandingPage;
