import React from 'react'
import { AgentsIcon } from '../../../assets';
import './style.scss';

interface StatusCardProps{
       cardNumber: number;
       cardTag: string;
       cardImage: any
}

const StatusCard:React.FC<StatusCardProps> = ({cardNumber, cardTag, cardImage}) => {
  return (
    <div id='status-card'>
        <div className="status-card-left">
            <span className="card-number">{ cardNumber ?? '234254'}</span>
            <span className='card-tag'>{ cardTag ?? 'Total Orders'}</span>
        </div>
        <div className="status-card-right">
              <img src={ cardImage ?? AgentsIcon} alt="img" />
        </div>
    </div>
  )
}

export default StatusCard