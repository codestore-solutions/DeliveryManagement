import { ColumnsType } from "antd/es/table";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";
import CustomizeData from "../../utils/helpers/CustomizeData";
import AgentService from "../../services/AgentService";
import { ApiConstants } from "../../constants/ApiConstants";
import CustomizeText from "../../utils/helpers/CustomizeText";
import { TableRowSelection } from "antd/es/table/interface";
import {
  manualAssignAgentInterface,
  updateOrderStatusByAgent,
} from "../../utils/types";
import { useDebounce } from "use-debounce";
import useScreenWidth from "../../Hooks/ScreenWidthHook";
import OrderService from "../../services/OrderService";

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
  key?: any;
  fetch?: any;
  isOpen?: any;
  handleResetSelectionForOrder?: any;
}

const AssignAgent: React.FC<Props> = ({
  type,
  selectedOrderData,
  onClose,
  key,
  fetch,
  isOpen,
  handleResetSelectionForOrder,
}) => {
  const [data, setData] = useState<any>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchInput.trim(), 500);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiCalling, setApiCalling] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<any>();
  const { isSmallScreen } = useScreenWidth();
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    total: data?.total,
    pageSize: 4,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });

  // Select A agent
  const handleRowSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
    let rowData = data?.list?.find((x: any) => x.key === selectedRowKeys[0]);
    setSelectedRowData(rowData);
  };
  // Reset the Selected Item
  const handleResetSelection = () => {
    setSelectedRowKeys([]);
    setSelectedRowData(null);
  };
  const searchHandler = (e: any) => {
    e.preventDefault();
    setSearchInput(searchInput);
  };

  const updateOrderStatusByAgent = async (payload: any) => {
    try {
      const {statusCode, message} = await OrderService.updateOrderByAgent(
        payload
      );
      if (statusCode === ApiConstants.successCode) {
        onClose();
        fetchAgents();
        message.success(message);
      }
    } catch (err) {
      console.log("Update Order Status By Agent", err);
    }
  };
  const AgentAssignHandler = async (values: any) => {
    try {
      setApiCalling(true);
      if (type === 0) {
        const updatedArray = data?.list?.map((obj: any) => {
          if (obj.id === values.id) {
            return { ...obj, loading: true };
          }
          return obj;
        });
        setData(updatedArray);
        let payload: Array<manualAssignAgentInterface> = [
          {
            agentId: values?.agentId,
            orderId: selectedOrderData?.id,
            vendorAddressId: selectedOrderData?.vendor?.business?.address_id,
            pickupLatitude:
              selectedOrderData?.vendor?.business?.address?.latitude,
            pickupLongitude:
              selectedOrderData?.vendor?.business?.address?.longitude,
            deliveryAddressId: selectedOrderData?.shippingAddress?.id,
            deliveryAddressLatitude:
              selectedOrderData?.shippingAddress?.latitude,
            deliveryAddressLongitude:
              selectedOrderData?.shippingAddress?.longitude,
            orderStatus: 5,
          },
        ];

        const res = await AgentService.assignAgentManually(
          payload
        );
        if (res.statusCode === ApiConstants.successCode) {
           let payload: updateOrderStatusByAgent = {
                  orderStatus: 5,
                  orders: [
                    {
                      orderId: res?.data[0]?.orderId,
                      deliveryAgentId: res?.data[0]?.agentId,
                    },
                  ],
                };
                // console.log("Assign Agent Manually", payload);
                updateOrderStatusByAgent(payload);
        }
      } else {
        let payload = CustomizeData.getOrdersArray(
          selectedOrderData,
          values?.agentId
        );

        AgentService.assignAgentManually(payload)
          .then((res: any) => {
            if (res.statusCode === ApiConstants.successCode) {
              let updatePayload = CustomizeData.updateOrderStatusPayload(res?.data);
              updateOrderStatusByAgent(updatePayload);
              fetch();
              handleResetSelectionForOrder();
            }
          })
          .catch((err) => {
            console.log("Bulk Manual Assign Error", err);
          });
      }
    } catch (error) {
      console.log("Assign Agent Error", error);
    } finally {
      setApiCalling(false);
    }
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "fullName",
      render: (fullName: string) => (
        <p className="highlighted-col-text">{fullName}</p>
      ),
    },

    {
      title: "Address",
      dataIndex: "address",
      render: (address: any) => CustomizeText(address),
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
  ];

  // Handle Change for Table
  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination({ ...pagination, pageNumber: current, limit: pageSize });
  };

  const fetchAgents = async () => {
    let payload = pagination;
    try {
      setLoading(true);
      const response = await AgentService.getAvailableAgents(
        payload,
        searchInput
      );
      if (response?.statusCode === 200) {
        setData(response);
      }
    } catch (err: any) {
      console.log("err fetching", err?.message);
      if (err?.status === 404) {
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // Row Selection Object for Table
  const rowSelection: TableRowSelection<any> = {
    type: "radio",
    selectedRowKeys,
    onChange: handleRowSelectChange,
  };

  useEffect(() => {
    fetchAgents();
  }, [isOpen, pagination.pageNumber, key, debouncedSearchTerm]);

  return (
    <div id="assign-agent">
      <div className="assign-agent-header">
        <form className="search-box" onSubmit={searchHandler}>
          <input
            type="text"
            value={searchInput}
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
        <div
          className="header-btns"
          style={isSmallScreen ? { display: "flex", overflow: "scroll" } : {}}
        >
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
            {apiCalling ? "Assigning..." : "Assign"}
          </Button>
        </div>
      </div>
      <div className="agent-assign-content">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data?.list}
          pagination={false}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ y: 340, x: 300 }}
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default AssignAgent;
