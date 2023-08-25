import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import {
    AgentStateInterface,
  agentSelector,
  getAllAgents,
} from "../../store/features/Agents/agentSlice";
import { pagination } from "../../utils/types";
import AgentService from "../../services/AgentService";
import { ApiConstants } from "../../constants/ApiConstants";
import { message } from "antd";

interface DeliveryAgentHookProps {
  searchInput?: string;
  filters?: any;
}

interface DeliveryAgentHookResult {
  loading: boolean;
  agentList: any; // Update this with the actual type
  pagination: pagination;
  handleTableChange: (pagination: any) => void;
  handleClick: (state: any) => void;
  deleteAgent: (id: number) => void;
}

const useDeliveryAgents = ({
  searchInput,
  filters,
}: DeliveryAgentHookProps): DeliveryAgentHookResult => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, agentList } = useAppSelector(agentSelector) as AgentStateInterface;
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 7,
    total: agentList?.total,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });

  const handleClick = (state: any) => {
    navigate(`/dashboard/agent-details/${state?.agentId}`, { state });
  };

  

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination({ ...pagination, pageNumber: current, pageSize });
  };

  const fetchAgents = () => {
    let payload = pagination;
    dispatch(getAllAgents({ payload, filters, searchInput }));
  };
  
  const deleteAgent = (id: number) =>{
    let payload = {
       agentId: id,
       isDeleted: true,
    }
    
    AgentService.deleteAgent(payload).then((res) =>{
           message.success(res?.message);
           fetchAgents();
       
    }).catch(err =>{
        console.log("Agent Deletion Error", err);
    })
  }
  useEffect(() => {
    fetchAgents();
  }, [dispatch, pagination.pageNumber, filters, searchInput]);

  useEffect(() => {
    setPagination({ ...pagination, total: agentList?.total });
  }, [agentList]);

  return {
    loading,
    agentList,
    pagination,
    handleTableChange,
    handleClick,
    deleteAgent
  };
};

export default useDeliveryAgents;
