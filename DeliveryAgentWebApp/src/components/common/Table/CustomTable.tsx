import { Table } from "antd";
import { FC } from "react";

import "./style.scss";

interface customTableProps {
  columns: Array<any>;
  data: Array<any>;
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
}) => {
  return (
    <Table
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
