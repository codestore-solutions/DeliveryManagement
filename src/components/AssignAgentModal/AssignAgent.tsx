import { ColumnsType } from "antd/es/table";
import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import {
  AgentStateInerface,
  agentSelector,
  getAvailableAgent,
} from "../../store/features/Agents/agentSlice";
import date from "../../utils/helpers/CustomizeDate";
import CustomizeData from "../../utils/helpers/CustomizeData";
import AgentService from "../../services/AgentService";
import { ApiContants } from "../../constants/ApiContants";
import OrderService from "../../services/OrderService";
import CustomizeText from "../../utils/helpers/CustomizeText";
import { TableRowSelection } from "antd/es/table/interface";
import CustomizeDate from "../../utils/helpers/CustomizeDate";

interface DataType {
  key: React.Key;
  name: string;
  status: string;
  address: string;
}

interface Props {
  type: number;
  selectedOrderData: any;
  onClose: () => void;
  key?:any
  fetch?: any;
  
}

const AssignAgent: React.FC<Props> = ({ type, selectedOrderData, onClose, key, fetch }) => {
  const dispatch = useAppDispatch();
  const { loading, availableAgent } = useAppSelector(
    agentSelector
  ) as AgentStateInerface;
  const [data, setData] = useState<any>(availableAgent);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<any>();

  // console.log("Dtaa", selectedOrderData);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    total: 0,
    pageSize: 4,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });

  // Select A agent
  const handleRowSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
    let rowData = data?.find((x: any) => x.key === selectedRowKeys[0]);
    setSelectedRowData(rowData);
  };

  // Reset the Selected Item
  const handleResetSelection = () => {
    setSelectedRowKeys([]);
    setSelectedRowData(null);
  };
  const AgentAssignHandler = async (values: any) => {
    try {
      if (type === 0) {
        const updatedArray = data?.map((obj: any) => {
          if (obj.id === values.id) {
            return { ...obj, loading: true }; // Step 3: Make modifications
          }
          return obj;
        });
        setData(updatedArray);
        let payload = {
          orderIds: [selectedOrderData?.id],
          deliveryAgentId: values?.deliveryAgentId,
          buisnessId: 2,
          pickupLatitude: selectedOrderData?.storeDetails?.pickupLatitudes,
          pickupLongitude: selectedOrderData?.storeDetails?.pickupLongitudes,
          deliveryAddressLatitude:
            selectedOrderData?.shippingAddressDetails?.deliveryAddressLatitudes,
          deliveryAddressLongitude:
            selectedOrderData?.shippingAddressDetails
              ?.deliveryAddressLongitudes,
        };
        let orderPayload = {
          agentId: [values?.deliveryAgentId],
          status: "agent_assigned",
          timestamp: date.getCurrentTimestamp(),
          orders: [selectedOrderData?.id],
        };
        AgentService.assignAgentManuallyToOrder(payload).then((res: any) => {
          if (res.status === ApiContants.successCode) {
            OrderService.updateOrder(orderPayload);
            fetchAgents();
          }
        });
      } else {
        let customizeOrders = CustomizeData.getOrdersArray(selectedOrderData);
        let payload = {
          deliveryAgentId:[values?.deliveryAgentId],
          orderIds: customizeOrders[0][0],
          pickupLatitudes: customizeOrders[0][1],
          pickupLongitudes: customizeOrders[0][2],
          deliveryAddressLatitudes: customizeOrders[0][3],
          deliveryAddressLongitudes: customizeOrders[0][4],
          businessId: 2,
        };
        // console.log("Manual Automatic Values", customizeOrders[0][4], payload);
        AgentService.assignAgentManuallyToOrderInBulk(payload)
        .then((res: any) => {
          if (res.statusCode === ApiContants.successCode) {
            let orderPayload = {
              agentId: res?.data?.agentId,
              status: res?.data?.status,
              timestamp: CustomizeDate.getCurrentTimestamp(),
              orders: res?.data?.orders,
            };
            OrderService.updateOrder(orderPayload).then((res) => {
              if (res?.status === ApiContants.successCode) {
                fetch();
                onClose();
              }
            });
          }
        })
        .catch((err) => {
          console.log("Bulk Manual Assign Error", err);
        });
      }
    } catch (error) {
      console.log("Assign Agent Error", error);
    } 
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "deliveryAgentName",
    },

    {
      title: "Address",
      dataIndex: "deliveryAgentAddress",
      render: (text) => CustomizeText(text),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: () => (
        <Space size="middle">
          <p className="tableTxt">Available</p>
        </Space>
      ),
    },
  ];

  // Handle Change for Table
  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination({ ...pagination, pageNumber: current, limit: pageSize });
  };

  const fetchAgents = () => {
    let payload = pagination;
    dispatch(getAvailableAgent({ payload }));
  };

  // Row Selection Object for Table
  const rowSelection: TableRowSelection<any> = {
    type: "radio",
    selectedRowKeys,
    onChange: handleRowSelectChange,
  };

  useEffect(() => {
    fetchAgents();
  }, [dispatch, pagination.pageNumber, key]);

  return (
    <div id="assign-agent">
      <div className="assign-agent-header">
        <input type="text" placeholder="Search" />
        <div className="header-btns">
          <Button
            type="default"
            onClick={handleResetSelection}
            className="custom-button"
          >
            {"Clear"}
          </Button>
          <Button
            type="primary"
            onClick={() => AgentAssignHandler(selectedRowData)}
          >
            Assign
          </Button>
        </div>
      </div>
      <div className="agent-assign-content">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ y: 340 }}
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default AssignAgent;
