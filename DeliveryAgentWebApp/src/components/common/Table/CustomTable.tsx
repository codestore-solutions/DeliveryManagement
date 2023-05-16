import { Table } from 'antd';
import { FC } from 'react'

import './style.scss'

interface customTableProps{
    columns: Array<any>;
    data: Array<any>;
    pageSizeOptions?: Array<number> | [3];
    showSizeChanger?: boolean,
    showQuickJumper?: boolean,
    pageSize: number;
}

const CustomTable: FC<customTableProps> = ({columns, data,pageSizeOptions, pageSize,showQuickJumper,showSizeChanger}) => {
  return (
    <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSizeOptions: pageSizeOptions,
          showSizeChanger: showSizeChanger,
          showQuickJumper: showQuickJumper,
          pageSize: pageSize,
          showTotal: (total:any, range:any) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        id="custom-table"
      />
  )
}

export default CustomTable