import { FC } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  Avatar,
  Dropdown,
  Image,
  MenuProps,
  Badge,
  Layout,
  Row,
  Col,
  Typography,
  Space,
} from "antd";
import { AvatarImage, NotificationIcon } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import { RootState } from "../../store";
import { AuthStateInterface, reset } from "../../store/features/Auth/authSlice";
import useScreenWidth from "../../Hooks/ScreenWidthHook";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;
const { Text } = Typography;
interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const { isSmallScreen } = useScreenWidth();
  const navigation = useNavigate();
  const { data } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthStateInterface;
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(reset());
  };
  const goToSetting = () => {
    navigation("/dashboard/profile");
  };
  const items: MenuProps["items"] = [
    {
      label: "Profile",
      key: "1",
      onClick: goToSetting,
    },
    {
      label: "Logout",
      key: "2",
      onClick: logoutHandler,
    },
  ];
  return (
    <Header style={{ background: "#fff" }}>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Col></Col>
        <Col>
          <Row gutter={10}>
            <Col>
              <Badge count={3}>
                <Image src={NotificationIcon} />
              </Badge>
            </Col>
            <Col>
              <Row gutter={5} style={{ display: "flex", alignItems: "center" }}>
                <Col>
                  <Avatar
                    size={50}
                    src={
                      <Image preview={false} src={AvatarImage} alt="avatar" />
                    }
                  />
                </Col>
                <Col>
                  <Dropdown menu={{ items }}>
                    <Space style={{ position: "relative", top: -8, left: 0 }}>
                      <Text
                        style={
                          isSmallScreen
                            ? { display: "none" }
                            : {
                                display: "flex",
                                flexDirection: "column",
                                paddingTop: "-15px",
                              }
                        }
                      >
                        {data?.name}
                        <Text style={{ fontSize: "10px" }}>{data?.email}</Text>
                      </Text>
                      <DownOutlined className="icon" />
                    </Space>
                  </Dropdown>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
