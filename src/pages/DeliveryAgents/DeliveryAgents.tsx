import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
// import { v4 as uuidv4 } from "uuid";
import "./style.scss";
// import dummyData from "../../../dummyData";
import {  useState, useEffect } from "react";
// import AgentServices from "../../services/AgentServices";
import { CustomTable } from "../../components";
import { BusyIcon, DeleteIcon, DetailsIcon } from "../../assets";
import { useNavigate } from "react-router-dom";
// import dummyData from "../../../dummyData";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import { AgentStateInerface, agentSelector, getAllAgents } from "../../store/features/Agents/agentSlice";
import CustomizeText from "../../utils/helpers/CustomizeText";
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


interface Props{
  searchInput?: string;
  filters?: any;
}

const DeliveryAgents: React.FC<Props> = ({searchInput, filters}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {loading, agentList}  = useAppSelector(agentSelector)  as AgentStateInerface;
  const [pagination, setPagination] = useState<pagination>({
    // simple: true,
    pageNumber: 1,
    total: 8,
    pageSize: 6,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
      // nextIcon: <RightOutlined style={{ color: '#545bfc', padding:'3px',  border:'1px solid #545bfc',fontSize: '15px', borderRadius:"5px" }} />,
      // prevIcon: <LeftOutlined style={{color: '#545bfc' , padding:'3px', border:'1px solid #545bfc',fontSize: '15px', borderRadius:"5px"  }} />,
   
  });

  const handleClick = (state: any) => {
    navigate(`/dashboard/agent-details/${state?.id}`, { state });
  };

  /**
   * Columns For The Table
   */
  const columns: ColumnsType<DataType> = [
    {
      title: "Email Id",
      dataIndex: "agentEmailId",
      key: "agentEmailId",
      render: (text) => <p className="col-text">{text}</p>,
    },
    {
      title: "Name",
      dataIndex: "deliveryAgentName",
      key: "deliveryAgentName",
      render: (text) => <p className="highlighted-col-text">{text}</p>,
    },
    {
      title: "Mobile Number",
      dataIndex: "contacts",
      key: "contacts",
      render: () => <p className="col-text">7860965109</p>,
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
      key: "agentStatus",
      dataIndex: "agentStatus",
      render: (_, { agentStatus }) => (
        <>
          <span>
            {agentStatus === 1 ? (
              <p className="available">Available</p>
            ) : agentStatus === 2 ? (
              <p className="busy">Busy</p>
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
      render: (text) => CustomizeText(text),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",

      render: () => <p className="col-text">10/01/2022</p>,
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

  const fetchAgents = () =>{
    let payload = pagination;
    
    dispatch(getAllAgents({payload, filters, searchInput}));
   }

  useEffect(() => {
      fetchAgents();
  }, [dispatch, pagination.pageNumber, filters, searchInput]);

  return (
    <div id="delivery-agent">
      <CustomTable
        columns={columns}
        data={agentList}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loading={loading}
      />
    </div>
  );
};

export default DeliveryAgents;
