import { Table } from "antd";
import { FC } from "react";

import "./style.scss";

interface customTableProps {
  rowSelection?: any;
  columns: Array<any>;
  data: any;
  pagination: {};
  handleTableChange: any;
  loading: boolean;
}

const CustomTable: FC<customTableProps> = ({
  columns,
  data,
  pagination,
  handleTableChange,
  loading,
  rowSelection,
}) => {
  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      pagination={pagination}
      onChange={handleTableChange}
      loading={loading}
      id="custom-table"
    />
  );
};

export default CustomTable;
