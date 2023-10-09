import React from "react";
import { AgentsIcon } from "../../../assets";
import "./style.scss";
import useScreenWidth from "../../../Hooks/ScreenWidthHook";

interface StatusCardProps {
  cardNumber: number;
  cardTag: string;
  cardImage: any;
}

const StatusCard: React.FC<StatusCardProps> = ({
  cardNumber,
  cardTag,
  cardImage,
}) => {
  const {isSmallScreen} = useScreenWidth();
  return (
    <div  id={isSmallScreen ? 'status-card-small': 'status-card'}>
      <div className="status-card-left">
        <img src={cardImage ?? AgentsIcon} alt="img" />
      </div>
      <div className="status-card-right">
      <div className="tags">
        <span className="card-number">{cardTag ?? "Total Orders"}</span>
        <span className="card-tag">{cardNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
