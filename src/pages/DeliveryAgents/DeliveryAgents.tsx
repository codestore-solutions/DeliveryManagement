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
  AgentStateInerface,
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, agentList } = useAppSelector(
    agentSelector
  ) as AgentStateInerface;
  const [pagination, setPagination] = useState<pagination>({
    pageNumber: 1,
    total: agentList?.total,
    pageSize: 6,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });
  const handleClick = (state: any) => {
    navigate(
      `/dashboard/agent-details/${state?.personalDetails?.deliveryAgentId}`,
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
      dataIndex: "personalDetails",
      key: "personalDetails",
      render: (personalDetails: any) => (
        <p className="col-text">{personalDetails?.email}</p>
      ),
    },
    {
      title: "Name",
      dataIndex: "personalDetails",
      key: "personalDetails",
      render: (personalDetails: any) => (
        <p className="highlighted-col-text">{personalDetails?.fullName}</p>
      ),
    },
    {
      title: "Mobile Number",
      dataIndex: "contacts",
      key: "contacts",
      render: () => <p className="col-text">7860965109</p>,
    },
    {
      title: "Status",
      key: "serviceLocation",
      dataIndex: "serviceLocation",
      render: (_, { serviceLocation }:any) => (
        <>
          <span>
            {serviceLocation?.agentStatus === 1 ? (
              <p className="available">Available</p>
            ) : (
              <p className="offline">offline</p>
            )}{" "}
          </span>
        </>
      ),
    },
    {
      title: "Region",
      dataIndex: "serviceLocation",
      key: "serviceLocation",
      render: (serviceLocation: any) => CustomizeText(serviceLocation?.address),
    },
    {
      title: "Date",
      dataIndex: "personalDetails",
      key: "personalDetails",

      render: (data: any) => (
        <p className="col-text"> {CustomizeDate.getDate(data?.dateOfBirth)} </p>
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

  return (
    <div id="delivery-agent">
      <CustomTable
        columns={columns}
        data={agentList?.list}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loading={loading}
      />
    </div>
  );
};

export default DeliveryAgents;
