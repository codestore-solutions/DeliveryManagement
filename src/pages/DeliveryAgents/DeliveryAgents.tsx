import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
// import { v4 as uuidv4 } from "uuid";
import "./style.scss";
// import dummyData from "../../../dummyData";
import { useState, useEffect } from "react";
// import AgentServices from "../../services/AgentServices";
import { CustomTable } from "../../components";
import { BusyIcon, DeleteIcon, DetailsIcon } from "../../assets";
import { useNavigate } from "react-router-dom";
// import dummyData from "../../../dummyData";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import {
  AgentStateInerface as AgentStateInterface,
  agentSelector,
  getAllAgents,
} from "../../store/features/Agents/agentSlice";
import CustomizeText from "../../utils/helpers/CustomizeText";
import CustomizeDate from "../../utils/helpers/CustomizeDate";
import { pagination } from "../../utils/types";
// import {RightOutlined, LeftOutlined} from "@ant-design/icons";

export interface DataType {
  key: React.Key;
  deliveryAgentId: string;
  deliveryAgentName: string;
  deliveryAgentAddress: string;
  agentStatus: number;
  verStatus: number;
}

interface Props {
  searchInput?: string;
  filters?: any;
}

const DeliveryAgents: React.FC<Props> = ({ searchInput, filters }) => {
  const scrollConfig = {
      x: 900
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, agentList } = useAppSelector(
    agentSelector
  ) as AgentStateInterface;
  const [pagination, setPagination] = useState<pagination>({
    pageNumber: 1,
    total: agentList?.total,
    pageSize: 7,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });
  const handleClick = (state: any) => {
    navigate(
      `/dashboard/agent-details/${state?.agentId}`,
      { state }
    );
  };

  /**
   * Columns For The Table
   */
  const columns: ColumnsType<DataType> = [
    {
      title: "Sr No.",
      dataIndex: "key",
      key: "key",
      render: (text) => <p className="tableId">{text}</p>,
    },
    {
      title: "Email Id",
      dataIndex: "email",
      key: "email",
      render: (email: string) => (
        <p className="col-text">{email}</p>
      ),
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName: string) => (
        <p className="highlighted-col-text">{fullName}</p>
      ),
    },
    {
      title: "Mobile Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumber:string) => <p className="col-text">{phoneNumber}</p>,
    },
    {
      title: "Status",
      key: "agentStatus",
      dataIndex: "agentStatus",
      render: (_, { agentStatus }:any) => (
        <>
          <span>
            {agentStatus === 1 ? (
              <p className="available">Available</p>
            ) : (
              <p className="offline">offline</p>
            )}{" "}
          </span>
        </>
      ),
    },
    {
      title: "Verification Status",
      key: "verificationStatus",
      dataIndex: "verificationStatus",
      render: (_, { verificationStatus }:any) => (
        <>
          <span>
            {verificationStatus === 1 ? (
              <p className="available">Verified</p>
            ) : (
              <p className="offline">Not Verified</p>
            )}{" "}
          </span>
        </>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: string) => CustomizeText(address),
    },
    {
      title: "Date",
      dataIndex: "dateOfBirth",
      key: "personalDetails",

      render: (dateOfBirth: any) => (
        <p className="col-text"> {CustomizeDate.getDate(dateOfBirth)} </p>
      ),
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
  };

  const fetchAgents = () => {
    let payload = pagination;
    dispatch(getAllAgents({ payload, filters, searchInput }));
  };

  useEffect(() => {
    fetchAgents();
  }, [dispatch, pagination.pageNumber, filters, searchInput]);
  useEffect(() => {
    setPagination({ ...pagination, total: agentList?.total });
    
  }, [agentList]);
  return (
    <div id="delivery-agent">
      <CustomTable
        columns={columns}
        data={agentList?.list}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loading={loading}
        scroll={scrollConfig}
      />
    </div>
  );
};

export default DeliveryAgents;
