import React from 'react'
import { Steps } from 'antd';
import './style.scss'

const customDot = () =>{
    return (
        <div className="dot"></div>
    )
}

const CustomTimeline: React.FC = () => { 
  return (
    <Steps
     className='custom-steps'
     progressDot={ customDot }
      current={1}
      items={[
        {
          title: 'On the way to pick parcel',
        //   description: 'This is a description.',
        },
        {
          title: 'Parcel Picked',
        //   description: 'This is a description.',
        },
        {
          title: 'On the way to deliver',
        //   description: 'This is a description.',
        },
        {
          title: 'Delivered',
        //   description: 'This is a description.',
        },
      ]}
    />
  )
}

export default CustomTimeline;