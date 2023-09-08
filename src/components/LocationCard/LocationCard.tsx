import React, { useEffect, useState } from "react";
import { Card, Image, Row, Col, Tag, Avatar } from "antd";
import { CheckedRadio } from "../../assets";
import OrderService from "../../services/OrderService";
import { ApiConstants } from "../../constants/ApiConstants";
const { Meta } = Card;

const LocationCard: React.FC<{ location: any }> = ({ location }) => {
  const [timeSlots, setTimeSlots] = useState<any>(null);
   
  const getSlotIds = (data:any) =>{
       return  data.map((item:any) => item.timeSlotId)
  }
  const getTimeSlots = async () => {
    try {
      const ids = getSlotIds(location?.agentTimeSlots);
      let params = {
         slotIds: ids
      }
      const { statusCode, data } = await OrderService.getTimSlotsByIds(params);
      if (statusCode === ApiConstants.successCode) {
        setTimeSlots(data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    let ids = getSlotIds(location?.agentTimeSlots);
    if(ids.length > 0){
      getTimeSlots();
    }
  }, []);
  return (
    <Card style={{ margin: "5px" }}>
      <Meta
        avatar={
          location?.isActive ? (
            <Image
              src={CheckedRadio}
              preview={false}
              style={{ width: "25px", height: "25px", objectFit: "contain" }}
            />
          ) : (
            <Avatar style={{ background: "#fff" }} />
          )
        }
        title={location?.locationName}
        description={
          <div>
            <p>{location?.address}</p>
            <Row gutter={16} style={{ justifyContent: "space-between" }}>
              <Col>Time Slot</Col>
              <Col>
                <span className="container-col dark">
                  {timeSlots?.map((slot: any) => (
                    <Tag key={slot?.id}>{slot?.slotName}</Tag>
                  ))}
                </span>
              </Col>
            </Row>
          </div>
        }
      />
    </Card>
  );
};

export default LocationCard;
