import { FC, useState } from "react";
import { Button, Tabs, TabsProps } from "antd";
import "./style.scss";
import {
  AssignedOrders,
  AvailableOrders,
  BuilkAssign,
  CompletedOrders,
  CustomModal,
  // OrderListFilter,
} from "../../components";
// import { FilterIcon } from "../../assets";
import useScreenWidth from "../../Hooks/ScreenWidthHook";

interface OrderProps {}

const Orders: FC<OrderProps> = () => {
  const { isSmallScreen} = useScreenWidth()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<React.Key[]>([]);
  const [activeTab, setActiveTab] = useState("1");
  const [isOpen, setIsOpen] = useState(false);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
 

  const handleResetSelectionForOrder = () => {
    setSelectedRowKeys([]);
    setSelectedRowData([]);
  };

 
  const startMultiSelect = (value: boolean) => {
    setIsMultiSelect(value);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  
  const onChangeTab = (key: string) => {
    setActiveTab(key);
  };
  // Tabination
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Available Orders`,
      children: (
        <AvailableOrders
          startMultiSelect={startMultiSelect}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          setSelectedRowData={setSelectedRowData}
          isOpen={isOpen}
          activeTab = {activeTab}
        />
      ),
    },
    {
      key: "2",
      label: `Assigned Orders`,
      children: <AssignedOrders activeTab={activeTab} />,
    },
    {
      key: "3",
      label: `Completed Orders`,
      children: <CompletedOrders  activeTab={activeTab} />,
    },
  ];

  return (
    <div id="available-list">
      <div className="agent-header">
        <div className={isSmallScreen ? "hide": "header-left"}>
          <h3>Delivery Request Management</h3>
        </div>
        <div className="header-right">
          {activeTab === "1" && (
            <div className="builk-assign">
              <Button
                type="primary"
                disabled={!isMultiSelect}
                onClick={handleOpenModal}
              >
                Bulk Assign
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="content">
        <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />
      </div>
      <CustomModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        component={
          <BuilkAssign
            orders={selectedRowData}
            onClose={handleCloseModal}
            fetch={fetch}
            isOpen={isOpen}
            handleResetSelectionForOrder = {handleResetSelectionForOrder}
          />
        }
        width={600}
      />
    </div>
  );
};

export default Orders;
