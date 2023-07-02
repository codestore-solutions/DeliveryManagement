import React from "react";
import { StarIcon, StarIconFade } from "../../assets";
import './style.scss'

interface Props{
    rating:number;
    comment:string;
}

const AgentFeedBack: React.FC<Props> = ({rating, comment}) => {

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<img key={i} src={StarIcon} alt="Star" />);
    }
    return stars;
  };
  const renderFadeStars = () => {
    const stars = [];
    for (let i = 0; i < 5 - rating; i++) {
      stars.push( <img src={StarIconFade} alt="Faded Star" />);
    }
    return stars;
  };
  return (
    <div id="feedback">
      <div className="row">
        <div className="col-1">Rating :</div>
        <div className="col-2">
          {renderStars()}
          {renderFadeStars()}
        </div>
      </div>
      <div className="row">
        <div className="col-1">Comment :</div>
        <div className="col-2">
         {comment}
        </div>
      </div>
    </div>
  );
};

export default AgentFeedBack;
