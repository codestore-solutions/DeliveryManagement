import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";
// import dummyData from "../../../dummyData";
import { useEffect, useState } from "react";
import AgentServices from "../../services/AgentServices";
import { CustomTable } from "../../components";
import { BusyIcon, DeleteIcon, DetailsIcon } from "../../assets";
import { useNavigate } from "react-router-dom";

export interface DataType {
  key: React.Key;
  deliveryAgentId: string;
  deliveryAgentName: string;
  deliveryAgentAddress: string;
  agentStatus: number;
  verStatus: number;
}

const DeliveryAgents: React.FC = () => {
  const navigate = useNavigate();
  const [agentsList, setAgentsList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    total: 8,
    pageSize: 6,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });

  const handleClick = (state: any) => {
    navigate(`/dashboard/agent-details/${state.deliveryAgentId}`, { state });
  };

  /**
   * Columns For The Table
   */
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "deliveryAgentName",
      key: "deliveryAgentName",
      render: (text) => <p className="highlighted-col-text">{text}</p>,
    },
    {
      title: "User Id",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (text) => <p className="col-text">{text}</p>,
    },
    {
      title: "Mobile Number",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (text) => <p className="col-text">{text}</p>,
    },
    // {
    //   title: "Status",
    //   key: "agentStatus",
    //   dataIndex: "agentStatus",
    //   filters: availibilityFilters,
    //   render: (_, { agentStatus }) => (
    //     <>
    //       <span>
    //         {" "}
    //         {agentStatus === 1 ? (
    //           <p className="tableTxtAv">Available</p>
    //         ) : (
    //           <p className="tableTxtNot">Not Available</p>
    //         )}{" "}
    //       </span>
    //     </>
    //   ),
    //   onFilter: (value: any, record: any) => record.agentStatus === value,
    // },
    {
      title: "Status",
      key: "verStatus",
      dataIndex: "verStatus",
      render: (_, { verStatus }) => (
        <>
          <span>
            {verStatus === 1 ? (
              <p className="available">Available</p>
            ) : verStatus === 2 ? (
              <p className="busy">Pending</p>
            ) : (
              <p className="offline">offline</p>
            )}{" "}
          </span>
        </>
      ),
    },
    {
      title: "Region",
      dataIndex: "deliveryAgentAddress",
      key: "deliveryAgentAddress",

      render: (text) => <p className="col-text">{text}</p>,
    },
    {
      title: "Date",
      dataIndex: "deliveryAgentAddress",
      key: "deliveryAgentAddress",

      render: (text) => <p className="col-text">{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Space size="middle" onClick={() => handleClick(record)}>
          <img src={DetailsIcon} alt="" />
          <img src={BusyIcon} alt="" />
          <img src={DeleteIcon} alt="" />
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination: any, filters: any) => {
    console.log("Page", filters);
    const { current, pageSize } = pagination;
    setPagination({ ...pagination, pageNumber: current, limit: pageSize });
    getAgents();
  };

  const getAgents = () => {
    let instance = AgentServices.getInstance();
    setLoading(true);
    let count = 1;
    instance
      .getAgentsList(pagination.pageNumber, pagination.pageSize)
      .then((res) => {
        const formattedData = res?.map((item: any) => ({
          ...item,
          key: uuidv4(),
          serialNo: count++,
        }));
        setAgentsList(formattedData);
        setLoading(false);
      });
    // console.log("datal", agentsList);
  };

  useEffect(() => {
    getAgents();
  }, [pagination.pageNumber]);

  return (
    <div id="delivery-agent">
      <CustomTable
        columns={columns}
        data={agentsList}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loading={loading}
      />
    </div>
  );
};

export default DeliveryAgents;
