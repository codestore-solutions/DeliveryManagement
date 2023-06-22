import React, { useState } from "react";
import "./style.scss";
import "../../pages/DeliveryAgents/style.scss";
import { Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { AssignAgent, CustomModal, CustomTable } from "../index";
// import { LoadingOutlined } from "@ant-design/icons";
import { AutomaticUser, DeliveryUserIcon, DetailsIcon } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import {
  OrderStateInerface,
  getAvailableOrders,
  orderSelector,
} from "../../store/features/Orders/ordersSlice";
import { pagination } from "../../utils/types";
import { useEffect } from "react";
import date from "../../utils/helpers/CustomizeDate";
import CutomizeText from "../../utils/helpers/CustomizeText";
import CustomizeData from "../../utils/helpers/CustomizeData";
import AgentService from "../../services/AgentService";
import { ApiContants } from "../../constants/ApiContants";
import CustomizeDate from "../../utils/helpers/CustomizeDate";
import OrderService from "../../services/OrderService";
// import dummyData from "../../../dummyData";

export interface DataType {
  key: React.Key;
  orderId: string;
  storename: number;
  shippingAddress: string;
  paymentType: number;
  date: string;
}

interface Props {
  selectedRowKeys: any;
  setSelectedRowKeys: any;
  setSelectedRowData: any;
  startMultiSelect: any;
  fetch: any;
  isOpen: any
}
// const antIcon = <LoadingOutlined style={{ color: "#fff" }} spin />;

const AvailableOrders: React.FC<Props> = ({
  selectedRowKeys,
  setSelectedRowKeys,
  setSelectedRowData,
  startMultiSelect,
  fetch,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const { loading, orderslist } = useAppSelector(
    orderSelector
  ) as OrderStateInerface;
  const data = CustomizeData.AvilableOrderData(orderslist?.list);
  const [pagination, setPagination] = useState<pagination>({
    pageNumber: 1,
    total: orderslist?.total,
    pageSize: 7,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const handleOpenModal = (record: any) => {
    setSelectedRow(record);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleClick = (state: any) => {
    navigate(`/dashboard/order-details/${state?.id}`);
  };

  // Handle Chnage for Table
  const handleTableChange = (pagination: any) => {
    console.log("pag", pagination);
    const { current, pageSize } = pagination;
    setPagination({ ...pagination, pageNumber: current, limit: pageSize });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "OrderId",
      dataIndex: "id",
      key: "id",
      render: (text: any) => CutomizeText(text),
    },
    {
      title: "Vender Name",
      dataIndex: "storeDetails",
      key: "storeDetails",
      render: (storeDetails: any) => CutomizeText(storeDetails?.storname),
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentType",
      key: "paymentType",
      render: (_, record: any) => (
        <Space size="middle">
          {record?.payment_type === 2 ? (
            <p className="offline">COD</p>
          ) : (
            <p className="available">Online</p>
          )}
        </Space>
      ),
    },
    {
      title: "Delivery Region",
      dataIndex: "shippingAddressDetails",
      key: "shippingAddressDetails",
      render: (shippingAddressDetails: any) =>
        CutomizeText(shippingAddressDetails.address),
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (text: any) => <p className="tableTxt">{date.getDate(text)}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="right" title={"Manual Agent Assign"}>
            <img
              src={DeliveryUserIcon}
              alt=""
              onClick={() => handleOpenModal(record)}
            />
          </Tooltip>

          <div onClick={() => handleClick(record)}>
            <img src={DetailsIcon} alt="" />
          </div>
          <Tooltip
            placement="right"
            title={isApiCall ? "Assigning.." : "Assign Agent"}
          >
            <img
              src={AutomaticUser}
              alt=""
              className="icon-style"
              onClick={() => !isApiCall && autoAssignAgent(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    const selectedRowData = data.filter((row: any) =>
      newSelectedRowKeys.includes(row?.key)
    );
    // console.log('Selected row data:', selectedRowData);
    setSelectedRowData(selectedRowData);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const fetchOrders = () => {
    let payload = pagination;
   
    dispatch(getAvailableOrders({ payload }));
   
  };

  // Automatic Assign Agent to Single Order
  const autoAssignAgent = (values: any) => {
    let payload = {
      orderId: values?.id,
      pickupLat: values.storeDetails.pickupLatitudes,
      pickupLong: values.storeDetails?.pickupLongitudes,
      deliveryAddressLat:
        values?.shippingAddressDetails?.deliveryAddressLatitudes,
      deliveryAddressLong:
        values?.shippingAddressDetails?.deliveryAddressLongitudes,
      businessId: 2,
    };
    AgentService.assignAgentAutomaticallyToOrder(payload)
      .then((res) => {
        setIsApiCall(true);
        if (res?.statusCode === ApiContants.successCode) {
          let orderPayload = {
            agentId: [res?.data.agentId],
            status: res?.data.status,
            timestamp: CustomizeDate.getCurrentTimestamp(),
            orders: [res?.data.orderId],
          };
          OrderService.updateOrder(orderPayload).then((res: any) => {
            if (res?.status === ApiContants.successCode) {
              fetchOrders();
            }
          });
        }
      })
      .catch((err) => {
        console.log("Assign Agent Auto Error ", err);
      })
      .finally(() => {
        setIsApiCall(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [dispatch, pagination.pageNumber, isOpen, fetch]);

  useEffect(() => {
    if (selectedRowKeys.length > 1) {
      startMultiSelect(true);
    } else {
      startMultiSelect(false);
    }
  }, [selectedRowKeys]);

  useEffect(() =>{
    setPagination({...pagination, total: orderslist?.total});
  }, [dispatch])

  return (
    <div id="available-list">
      <CustomTable
        rowSelection={rowSelection}
        columns={columns}
        data={data}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loading={loading}
      />
      <CustomModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        component={
          <AssignAgent
            type={0}
            selectedOrderData={selectedRow}
            onClose={handleCloseModal}
            isOpen={isOpen}
          />
        }
        width={600}
      />
    </div>
  );
};

export default AvailableOrders;
