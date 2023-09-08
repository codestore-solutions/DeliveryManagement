import React, { useState } from "react";
import { Space, Tabs, message, type TabsProps, Button } from "antd";
import { AssignAgent } from "..";
import CustomizeData from "../../utils/helpers/CustomizeData";
import Table, { ColumnsType } from "antd/es/table";
import { CancelIcon } from "../../assets";
import AgentService from "../../services/AgentService";
import { ApiConstants } from "../../constants/ApiConstants";
import {
  manualAssignAgentInterface,
  previewDataInterface,
} from "../../utils/types";

interface Props {
  selectedRow: any;
  handleCloseModal: () => void;
  isOpen: boolean;
}

interface AutoProps {
  orders: any;
  onClose: () => void;
}

// Bulk Automatic Assign Component
const AutomaticAssign: React.FC<AutoProps> = ({ orders, onClose }) => {
  const [previewData, setPreviewData] = useState<Array<previewDataInterface>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreView] = useState<boolean>(false);
  let customizeOrders = CustomizeData.getSingleOrderArray(orders);

  const removePreviewAgent = (values: any) => {
    let filterData = previewData?.filter(
      (item: any) => item.orderId !== values.orderId
    );
    setPreviewData(filterData);
  };

  const columns: ColumnsType<previewDataInterface> = [
    {
      title: "OrderId",
      dataIndex: "orderId",
      render: (text) => <p className="tableTxt dark">{text}</p>,
    },
    {
      title: "Agent Id",
      dataIndex: "deliveryAgentId",
      render: (text) => (
        <p className="tableTxt dark">{!text ? "Not Available" : text}</p>
      ),
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
          console.log("res?.data", res?.data);
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
    const payload = CustomizeData.assignAgentAutoDataSingle(
      previewData,
      customizeOrders
    ) as manualAssignAgentInterface;
    if (payload?.agentId !== null) {
      AgentService.assignAgentManually(payload).then((res: any) => {
        if (res.statusCode === ApiConstants.successCode) {
          setLoading(false);
          onClose();
          message.success(res?.message);
        }
      });
    }
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

const SingleAssign: React.FC<Props> = ({
  selectedRow,
  isOpen,
  handleCloseModal,
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
          type={0}
          selectedOrderData={selectedRow}
          onClose={handleCloseModal}
          isOpen={isOpen}
        />
      ),
    },
    {
      key: "2",
      label: `Automatic Assign`,
      children: (
        <AutomaticAssign orders={selectedRow} onClose={handleCloseModal} />
      ),
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey={key} items={items} onChange={onChange} />
    </div>
  );
};

export default SingleAssign;
