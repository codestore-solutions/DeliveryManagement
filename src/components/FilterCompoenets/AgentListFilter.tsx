import { Button, Form, Radio } from "antd";
import React from "react";

interface Props{
    setFilters:any;
    handleCloseModal: Function;
    filters?:any
}


const AgentListFilter: React.FC <Props>= ({setFilters, handleCloseModal, filters}) => {
  const SubmitHandler = async (values: any) => {
     setFilters(values);
     handleCloseModal();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div id="filters">
      <h3>Filters</h3>
      <div className="filter-items">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={SubmitHandler}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="form-item">
            <Form.Item label="Status"  name="status">
              <Radio.Group style={{ display: "flex", flexDirection: "column" }}  value={filters?.status}>
                <Radio value="1"> Available </Radio>
                <Radio value="2"> Busy </Radio>
                <Radio value="0"> Offline </Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AgentListFilter;
