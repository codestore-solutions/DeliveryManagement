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
  scroll?: any
}

const CustomTable: FC<customTableProps> = ({
  columns,
  data,
  pagination,
  handleTableChange,
  loading,
  rowSelection,
  scroll
}) => {
  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      pagination={pagination}
      onChange={handleTableChange}
      loading={loading}
      scroll={scroll}
      id="custom-table"
    />
  );
};

export default CustomTable;
