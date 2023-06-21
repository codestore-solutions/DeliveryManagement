import React, { useState } from "react";
import { Button, Space, Table, Tabs } from "antd";
import type { TabsProps } from "antd";
import { AssignAgent } from "..";
import "./style.scss";
import CustomizeData from "../../utils/helpers/CustomizeData";
import AgentService from "../../services/AgentService";
import { ApiContants } from "../../constants/ApiContants";
// import OrderService from "../../services1/OrderService";
import { CancelIcon } from "../../assets";
import { ColumnsType } from "antd/es/table";
import CustomizeText from "../../utils/helpers/CustomizeText";
import CustomizeDate from "../../utils/helpers/CustomizeDate";
import OrderService from "../../services/OrderService";

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
  isOpen:any
  handleResetSelectionForOrder: () => void;
}

// Bulk Automatic Assign Component
const AutomaticAssign: React.FC<Props> = ({
  orders,
  onClose,
  fetch,
  handleResetSelectionForOrder
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
      title: "Agent Name",
      dataIndex: "deliveryAgentName",
      render: (text) => <p className="tableTxt">{text}</p>,
    },
    {
      title: "Address",
      dataIndex: "deliveryAddress",
      render: (text) => CustomizeText(text),
      width: "35%",
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
        orderIds: customizeOrders[0][0],
        pickupLatitudes: customizeOrders[0][1],
        pickupLongitudes: customizeOrders[0][2],
        deliveryAddressLatitudes: customizeOrders[0][3],
        deliveryAddressLongitudes: customizeOrders[0][4],
        businessId: 2,
      };

      console.log("Automaticselected", payload);
      setLoading(true);
      AgentService.assignAgentToOrderInBulkAutomatically(payload).then(
        (res) => {
          if (res.statusCode === ApiContants.successCode) {
            let data = CustomizeData.previewData(res?.data);
            setPreviewData(data);
            setLoading(false);
          }
        }
      );
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
    const getConformAssignData = CustomizeData.assignAgentAutoData(
      previewData,
      orders
    );
    // console.log("data", getConformAssignData, orders);
    AgentService.assignAgentManuallyToOrderInBulk(getConformAssignData)
      .then((res: any) => {
        if (res.statusCode === ApiContants.successCode) {
          let orderPayload = {
            agentId: res?.data?.agentId,
            status: res?.data?.status,
            timestamp: CustomizeDate.getCurrentTimestamp(),
            orders: res?.data?.orders,
          };
          setLoading(true);
          OrderService.updateOrder(orderPayload).then((res) => {
            if (res?.status === ApiContants.successCode) {
              setLoading(false);
              handleResetSelectionForOrder();
              fetch();
              onClose();
            }
          });
        }
      })
      .catch((err) => {
        console.log("Bulk Manual Assign Error", err);
      });
  };

  return (
    <div id="automatic-assign">
      <div className="automatic-assign-header">
        <h3 className="tableTxt">Selected Agnets Preview</h3>
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

const BuilkAssign: React.FC<Props> = ({ orders, onClose, fetch, isOpen, handleResetSelectionForOrder }) => {
  const [key, setKey] = useState<any>();
  const onChange = (key: string) => {
    setKey(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
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
    {
      key: "2",
      label: `Mannual Assign`,
      children: (
        <AssignAgent
          key={key}
          type={1}
          selectedOrderData={orders}
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
