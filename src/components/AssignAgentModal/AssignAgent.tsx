import { ColumnsType } from "antd/es/table";
import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";
// import date from "../../utils/helpers/CustomizeDate";
import CustomizeData from "../../utils/helpers/CustomizeData";
import AgentService from "../../services/AgentService";
import { ApiContants } from "../../constants/ApiContants";
// import OrderService from "../../services/OrderService";
import CustomizeText from "../../utils/helpers/CustomizeText";
import { TableRowSelection } from "antd/es/table/interface";
// import CustomizeDate from "../../utils/helpers/CustomizeDate";
import { manualAssignAgentInterface } from "../../utils/types";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [apiCalling, setApiCalling] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<any>();

  // console.log("Dtaa", selectedOrderData);
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
            deliveryAgentId: values?.personalDetails?.deliveryAgentId,
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
          },
        ];
        const { statusCode, message } = await AgentService.assignAgentManually(
          payload
        );
        if (statusCode === ApiContants.successCode) {
          onClose();
          fetchAgents();
          message.success(message);
        }
      } else {
        let payload = CustomizeData.getOrdersArray(
          selectedOrderData,
          values?.personalDetails?.deliveryAgentId
        );
        // console.log("Manual Automatic Values", payload);
        AgentService.assignAgentManually(payload)
          .then((res: any) => {
            if (res.statusCode === ApiContants.successCode) {
              fetch();
              handleResetSelectionForOrder();
              onClose();
              message.success(res?.message);
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
      dataIndex: "personalDetails",
      render: (personalDetails: any) => (
        <p className="highlighted-col-text">{personalDetails?.fullName}</p>
      ),
    },

    {
      title: "Address",
      dataIndex: "serviceLocation",
      render: (serviceLocation: any) => CustomizeText(serviceLocation?.address),
    },
    {
      title: "Status",
      key: "serviceLocation",
      dataIndex: "serviceLocation",
      render: (_, { serviceLocation }: any) => (
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
      const data = await AgentService.getAvialableAgents(payload);
      if (data?.statusCode === 200) {
        //  console.log('data', data);
        setData(data);
      }
    } catch (err) {
      console.log("err", err);
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
  }, [isOpen, pagination.pageNumber, key]);

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
          scroll={{ y: 340 }}
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default AssignAgent;
