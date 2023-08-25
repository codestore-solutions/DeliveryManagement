import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./style.scss";
import { CustomTable } from "../../components";
import { DeleteIcon, DetailsIcon } from "../../assets";
import CustomizeText from "../../utils/helpers/CustomizeText";
import CustomizeDate from "../../utils/helpers/CustomizeDate";

import useDeliveryAgents from "./Hook";

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
  const { loading, agentList, pagination, handleTableChange, handleClick, deleteAgent } =
    useDeliveryAgents({ searchInput, filters });
  const scrollConfig = {
    x: 900,
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
      render: (email: string) => <p className="col-text">{email}</p>,
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
      render: (phoneNumber: string) => (
        <p className="col-text">{phoneNumber}</p>
      ),
    },
    {
      title: "Status",
      key: "agentStatus",
      dataIndex: "agentStatus",
      render: (_, { agentStatus }: any) => (
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
      render: (_, { verificationStatus }: any) => (
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
        <Space size="middle">
          <img src={DetailsIcon} alt=""  onClick={() => handleClick(record)} />
          <img src={DeleteIcon} alt="" onClick={() => deleteAgent(record?.agentId)} />
        </Space>
      ),
    },
  ];

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
