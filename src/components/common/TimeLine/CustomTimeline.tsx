import React,{useState,useEffect} from 'react'
import { Steps } from 'antd';
import './style.scss'
import OrderService from '../../../services/OrderService';
import { ApiContants } from '../../../constants/ApiContants';
import { getCurrIdx, getTimeLineData } from '../../../utils/helpers/CustomizeTimeLine';

const customDot = () =>{
    return (
        <div className="dot"></div>
    )
}

interface Props{
   id: number
}

const CustomTimeline: React.FC<Props> = ({id}) => { 
  const [curr, setCurr] = useState<any>();
  const [timeLinedata, setTimeLineData] = useState<any>([
    {
      key:0,
      title: '',
      description: '',
    },
    {
      key:1,
      title: '',
      description: '',
    },
    {
      key:2,
      title: '',
      description: '',
    },
    {
      key:3,
      title: '',
      description: '',
    },
  ]);
  
  const updateTimeLineData = (payload: any): void => {
    setTimeLineData((prevData:any) =>
      prevData.map((item:any) => (item.key === payload.key ? { ...item, ...payload } : item))
    );
  };
  const getTimeLineDetails = async() =>{
     try {
        const {data, statusCode} = await OrderService.getOrderTimeline(Number(id));
        if(statusCode === ApiContants.successCode){
          if(data.length > 0){
            getTimeLineData(data,updateTimeLineData);
             let currIdx = getCurrIdx(data);
            //  console.log('currdata', currIdx)
             setCurr(currIdx);
          }
        }
     } catch (err) {
         console.log('Timeline fetching err', err)
     }
  }
  
  useEffect(() =>{
    getTimeLineDetails();
  }, [id])

  return (
    <Steps
     className='custom-steps'
     progressDot={ customDot }
      current={curr}
      items={timeLinedata}
    />
  )
}

export default CustomTimeline;