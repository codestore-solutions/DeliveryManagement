import React from "react";
import { Timeline } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import "./style.scss";

const timeLineData = [
  {
    dot: <CheckCircleFilled style={{ color: "green" }} />,
    children: <p className="tag-style">Order Assigned</p>,
    color: "green",
  },
  {
    children: <p className="tag-style">Order Picked</p>,
  },
  {
    children: <p className="tag-style">Order Progress</p>,
  },
  {
    children: <p className="tag-style">Order Delivered</p>,
  },
];

const TrackOrder: React.FC = () => {
  return (
    <div id="track-order">
      <h1>Track Orders</h1>
      <div className="container">
        <Timeline items={timeLineData} />
      </div>
    </div>
  );
};

export default TrackOrder;
