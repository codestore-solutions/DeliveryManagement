import { FC } from 'react'

import './style.scss'
import { Row, Col, Input } from 'antd';
import { AssignedOrders, AvailableOrders } from '../../components';
interface OrderProps {

}

const { Search } = Input;

const Orders: FC<OrderProps> = () => {

  const onSearch = (value: string) =>{
    console.log("Search Elemet", value)
  }
  return (
    <div id="orders">
        <div className="header">
            <h3 className="heading">Order Mangement</h3>
            <div className="search-input">
            <Search placeholder="Search Orders" onSearch={onSearch} style={{ width: 200 }} />
            </div>
        </div>
        <Row>
            <Col span={13}>
              <h3 style={{color:"grey", letterSpacing:0.02, padding:"10px 0"}}>Available Orders List</h3>
              <AvailableOrders />
              
            </Col>
            <Col span={11}> 
            <h3 style={{color:"grey", letterSpacing:0.02, padding:"10px 0"}}>Assigned Orders List</h3>
              <AssignedOrders />
            </Col>
        </Row>
    </div>
  )
}

export default Orders