import React from 'react';
import { Button } from 'antd';
import './style.scss'; // Custom CSS file

interface CutomButtonProps{
    shape?: any;
    size: any;
    type: any | 'default';
    title: string;
}


const CustomButton: React.FC<CutomButtonProps> = ({type, shape, size, title}) => {
  return (
    <Button className="custom-button" type={type} shape={shape} size={size}>
     {title}
    </Button>
  );
};

export default CustomButton;
