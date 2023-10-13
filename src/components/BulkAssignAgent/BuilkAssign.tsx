import React, { useState } from "react";
import { Button, Space, Table, Tabs, message } from "antd";
import type { TabsProps } from "antd";
import { AssignAgent } from "..";
import "./style.scss";
import CustomizeData from "../../utils/helpers/CustomizeData";
import AgentService from "../../services/AgentService";
import { ApiConstants } from "../../constants/ApiConstants";
import { CancelIcon } from "../../assets";
import { ColumnsType } from "antd/es/table";


interface DataType {
  key: React.Key;
  deliveryAgentName: string;
  orderId: number;
  deliveryAddress: string;
}

interface Props {
  orders: any;
  onClose: () => void;
  fetch: any;
  isOpen: any;
  handleResetSelectionForOrder: () => void;
  fetchBulkData?: () => void;
}

// Bulk Automatic Assign Component
const AutomaticAssign: React.FC<Props> = ({
  orders,
  onClose,
  fetch,
  handleResetSelectionForOrder,
}) => {
  const [previewData, setPreviewData] = useState<Array<any>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreView] = useState<boolean>(false);
  let customizeOrders = CustomizeData.getOrdersArrayBulk(orders);

  const removePreviewAgent = (values: any) => {
    let filterData = previewData?.filter(
      (item: any) => item.orderId !== values.orderId
    );
    setPreviewData(filterData);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "OrderId",
      dataIndex: "orderId",
      render: (text) => <p className="tableTxt dark">{text}</p>,
    },
    {
      title: "Agent Id",
      dataIndex: "deliveryAgentId",
      render: (text) => <p className="tableTxt dark">{!text ? "Not Available" : text}</p>,
    },
    {
      title: "Agent Name",
      dataIndex: "deliveryAgentName",
      render: (text) => <p className="tableTxt">{text}</p>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <img
            src={CancelIcon}
            alt="cancel"
            className="cancel-btn"
            onClick={() => removePreviewAgent(record)}
          />
        </Space>
      ),
    },
  ];

  const aasignAgentAutomatically = async () => {
    try {
      let payload = {
        list: customizeOrders,
      };
      console.log("Automaticselected", payload);
      setLoading(true);
      AgentService.assignAgentAutomatically(payload).then((res) => {
        if (res.statusCode === ApiConstants.successCode) {
          console.log('res?.data assi', res?.data)
          setPreviewData(res?.data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("AutomaticselectedAssignError", error);
      setLoading(false);
    }
  };

  const resetPreview = () => {
    setPreView(false);
    setPreviewData([]);
  };
  const PreViewHandler = () => {
    aasignAgentAutomatically();
    setPreView(!preview);
  };

  const aasignAgentConform = () => {
    const payload = CustomizeData.assignAgentAutoData(previewData, orders);
    // console.log("data", payload);
    AgentService.assignAgentManually(payload).then((res: any) => {
      if (res.statusCode === ApiConstants.successCode) {
        setLoading(false);
        handleResetSelectionForOrder();
        fetch();
        onClose();
        message.success(res?.message);
      }
    });
  };

  return (
    <div id="automatic-assign">
      <div className="automatic-assign-header">
        <h3 className="tableTxt">Selected Agents Preview</h3>
        <Button
          type="default"
          className="custom-button"
          onClick={PreViewHandler}
        >
          {"Preview"}
        </Button>
      </div>
      {preview && (
        <>
          <div className="preview-table">
            <Table
              columns={columns}
              dataSource={previewData}
              pagination={false}
              loading={loading}
              scroll={{ y: 240 }}
            />
          </div>
          <div className="agent-conform-btn">
            <Button
              type="default"
              onClick={resetPreview}
              className="custom-button"
            >
              {"Cancel"}
            </Button>
            <Button
              type="primary"
              disabled={loading}
              onClick={aasignAgentConform}
            >
              {"Assign"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const BuilkAssign: React.FC<Props> = ({
  orders,
  onClose,
  fetch,
  isOpen,
  handleResetSelectionForOrder,
  fetchBulkData
}) => {
  const [key, setKey] = useState<any>();
  const onChange = (key: string) => {
    setKey(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Manual Assign`,
      children: (
        <AssignAgent
          key={key}
          type={1}
          selectedOrderData={orders}
          onClose={onClose}
          fetch={fetch}
          isOpen={isOpen}
          fetchBulkData={fetchBulkData}
          handleResetSelectionForOrder={handleResetSelectionForOrder}
        />
      ),
    },
    {
      key: "2",
      label: `Automatic Assign`,
      children: (
        <AutomaticAssign
          orders={orders}
          onClose={onClose}
          fetch={fetch}
          isOpen={isOpen}
          handleResetSelectionForOrder={handleResetSelectionForOrder}
          />
      ),
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default BuilkAssign;
