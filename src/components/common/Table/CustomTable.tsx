import { Table } from "antd";
import { FC } from "react";

import "./style.scss";


interface customTableProps {
  rowSelection?: any;
  columns: Array<any>;
  data: any;
  pagination: {};
  handleTableChange?: any;
  loading: boolean;
  scroll?: {
    x: number | string; 
  };
}

const CustomTable: FC<customTableProps> = ({
  columns,
  data,
  pagination,
  handleTableChange,
  loading,
  rowSelection,
  scroll,
}) => {
  const defaultScroll = { x: 800 };
  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      pagination={pagination}
      onChange={handleTableChange}
      loading={loading}
      scroll={scroll ? { ...defaultScroll, ...scroll } : defaultScroll}
      id="custom-table"
      
    />
  );
};

export default CustomTable;
