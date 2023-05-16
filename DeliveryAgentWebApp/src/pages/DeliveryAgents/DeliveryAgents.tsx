import { Space, Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppstoreOutlined, FilterFilled } from "@ant-design/icons";
import "./style.scss";
import dummyData from "../../../dummyData";
import { useEffect, useState } from "react";
import AgentServices from "../../services/AgentServices";

export interface DataType {
  key: React.Key;
  agent_id: string;
  name: string;
  age: number;
  address: string;
  status: string[];
  availibility: string[];
}
const pageSizeOptions = ["6", "14", "21", "28"];
const statusFilters = [
  { text: "Verified", value: "Verified" },
  { text: "NotVerified", value: "NotVerified" },
  { text: "Pending", value: "Pending" },
];
const addressFilters = [
  {
    text: "Delhi",
    value: "Delhi",
  },
  {
    text: "Lucknow",
    value: "Lucknow",
  },
  {
    text: "Noida Sector 59",
    value: "Noida Sector 59",
  },
];
const DeliveryAgents: React.FC = () => {
  const [agentsList, setAgentsList] = useState<any>();
  const columns: ColumnsType<DataType> = [
    {
      title: "Agent ID",
      dataIndex: "agent_id",
      key: "agent_id",
      render: (text) => <p className="tableId">{text}</p>,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p className="tableTxt">{text}</p>,
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      filters: addressFilters,
      onFilter: (value: any, record: any) =>
        record.address.toString().toLowerCase().startsWith(value.toLowerCase()),
      filterSearch: true,
      width: "40%",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          {status.map((tag: any) => {
            let color = tag.length > 7 ? "green" : "geekblue";
            if (tag === "NotVerfied") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      filters: statusFilters,
      onFilter: (value: any, record) =>
        record.status.toString().toLowerCase() ===
        value.toString().toLowerCase(),
    },
    {
      title: "Availibility",
      key: "availibility",
      dataIndex: "availibility",
      render: (_, { availibility }) => (
        <>
          {availibility.map((tag: any) => {
            let color = tag.length >= 3 ? "green" : "volcano";
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Assign Order",
      key: "action",
      render: () => (
        <Space size="middle">
          {/* <a>Assign Order</a> */}
          {/* <Select
            showSearch
            placeholder="Search Order Id"
            onSearch={handleSearch}
            optionFilterProp="label"
            style={{ minWidth: "160px" }}
          >
            {filteredOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select> */}
          <Button style={{ background: "#808080", color: "white" }}>
            Assign Order
          </Button>
          <AppstoreOutlined />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const getAgents = async () => {
      let instance = AgentServices.getInstance();
      let data = instance.getAgentsList();
      setAgentsList(data);
    };
    getAgents();
  }, []);

  return (
    <div id="delivery-agent">
      <div className="header">
        <h3>Delivery Agent List</h3>
        <Button type="default" className="filter-btn">
          <FilterFilled />
          Filters
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dummyData.data}
        pagination={{
          pageSizeOptions,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: 6,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        className="custom-table"
      />
    </div>
  );
};

export default DeliveryAgents;
