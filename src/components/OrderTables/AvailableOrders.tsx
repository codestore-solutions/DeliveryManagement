import React, { useState } from "react";
import "./style.scss";
import "../../pages/DeliveryAgents/style.scss";
import { Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import {  CustomModal, CustomTable } from "../index";
import {  DeliveryUserIcon, DetailsIcon } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import {
  OrderStateInerface as OrderStateInterface,
  getAvailableOrders,
  orderSelector,
} from "../../store/features/Orders/ordersSlice";
import {  pagination } from "../../utils/types";
import { useEffect } from "react";
import date from "../../utils/helpers/CustomizeDate";
import CutomizeText from "../../utils/helpers/CustomizeText";
import SingleAssign from "../SingleAssign/SingleAssign";


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
  setSelectedRowKeys: Function;
  setSelectedRowData: Function;
  startMultiSelect: Function;
  fetch: any;
  isOpen: boolean;
}


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
  ) as OrderStateInterface;
  const data = orderslist?.list;
  const [pagination, setPagination] = useState<pagination>({
    simple: false,
    pageNumber: 1,
    total: orderslist?.total,
    pageSize: 5,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
    });
  const [isOpen, setIsOpen] = useState(false);
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
      title: "Sr. No",
      dataIndex: "key",
      key: "key",
      render: (text: any) => <p className="tableId">{text}</p>,
    },
    {
      title: "OrderId",
      dataIndex: "id",
      key: "id",
      render: (text: any) => CutomizeText(text),
    },
    {
      title: "Vendor Name",
      dataIndex: "vendor",
      key: "vendor",
      render: (vendor: any) => CutomizeText(vendor?.business?.name),
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      key: "paymentMode",
      render: (_, record: any) => (
        <Space size="middle">
          {record?.paymentMode === 2 ? (
            <p className="offline">COD</p>
          ) : (
            <p className="available">Online</p>
          )}
        </Space>
      ),
    },
    {
      title: "Delivery Region",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (shippingAddress: any) =>
        CutomizeText(shippingAddress.street + shippingAddress.state),
    },
    {
      title: "Date",
      key: "createdAt",
      dataIndex: "createdAt",
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
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const selectedRowData = data.filter((row: any) =>
      newSelectedRowKeys.includes(row?.key)
    );
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

  useEffect(() => {
    setPagination({ ...pagination, total: orderslist?.total });
  }, [dispatch]);

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
          <SingleAssign selectedRow={selectedRow} handleCloseModal={handleCloseModal} isOpen={isOpen}  />
        }
        width={600}
      />
    </div>
  );
};

export default AvailableOrders;
