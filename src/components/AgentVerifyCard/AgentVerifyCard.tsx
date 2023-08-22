import React, { useEffect, useState } from "react";
import { Col, Row, Switch, Typography, message } from "antd";
import "../../pages/AgentDetails/style.scss";
import { AadhaarImage, DetailsIcon, LicenseImage, PanImage, ProfileImg } from "../../assets";
import { verifyAgentKycInterface } from "../../utils/types";
import AgentService from "../../services/AgentService";
import { ApiConstants } from "../../constants/ApiConstants";
import { CustomModal } from "..";
import AgentDocument from "../AgentDocument/AgentDocument";

const { Text, Title } = Typography;

interface Props {
  agentId: number;
}

const AgentVerifyCard: React.FC<Props> = ({ agentId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [cardDetails, setCardDetails] = useState<any>();
  console.log('isVerified', isVerified)
  const cardData = [
    {
      key: 1,
      label: "Aadhaar Card",
      image: AadhaarImage,
    },
    {
      key: 2,
      label: "Pan Card",
      image: PanImage,
    },
    {
      key: 3,
      label: "Driving License",
      image: LicenseImage,
    },
  ];

  const handleOpenModal = (item:any) => {
    setIsOpen(true);
    setCardDetails(item);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const onChange = (checked: boolean) => {
    let payload: verifyAgentKycInterface = {
      agentId: agentId,
      verificationStatus: checked ? 1 : 0,
    };
    AgentService.verifyAgentKyc(payload).then((res) => {
      if (res?.statusCode === ApiConstants.successCode) {
        message.success(res?.message);
      }
    });
  };

  const getVerificationStatus = () =>{
    let params = { agentId: agentId};
    AgentService.getVerificationStatus(params).then((res) =>{
        if(res?.statusCode === ApiConstants.successCode){
             if(res?.data?.verificationStatus === 1){

                setIsVerified(true);
             }else{
                setIsVerified(false);
             }
        }
    })
  }
  
  useEffect(() =>{
     getVerificationStatus();
  }, [isVerified])

  return (
    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
      <div className="card-container">
        <Row gutter={16} justify="space-between" align="middle">
          <Col>
            <h3>Agent Documents</h3>
          </Col>
          <Col>
            <Text style={{ paddingRight: "10px" }}>Verify Agent</Text>
            <Switch defaultChecked={isVerified} onChange={onChange} />
          </Col>
        </Row>
        <Row gutter={16} style={{ paddingTop: "10px" }}>
          <Col span={6}>
            <img src={ProfileImg} alt="profile" />
            <Title level={5} style={{ textAlign: "center" }}>
              Agent Name
            </Title>
          </Col>
          <Col span={18}>
            {cardData?.map((item) => (
              <Row
                gutter={16}
                justify="space-between"
                align="middle"
                style={{ paddingBottom: "10px" }}
                key={item?.key}
              >
                <Col>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={item.image} alt="" width={50} height={50} />
                    <Text
                      className="container-col"
                      style={{ paddingLeft: "5px" }}
                    >
                      {item?.label}
                    </Text>
                  </div>
                </Col>
                <Col className="container-col dark">
                  <img src={DetailsIcon} alt="" onClick={() =>handleOpenModal(item)} />
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </div>
      <CustomModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        component={<AgentDocument data={[cardDetails]} />}
        
      />
    </Col>
  );
};

export default AgentVerifyCard;
