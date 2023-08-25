import { Tabs } from "antd";
import { useState } from "react";
import { useDebounce } from 'use-debounce';
import DeliveryAgents from "./DeliveryAgents";
import { AssignedAgents } from "..";
import "./style.scss";
import { FilterIcon } from "../../assets";
import { AgentListFilter, CustomModal } from "../../components";
import useScreenWidth from "../../Hooks/ScreenWidthHook";
const { TabPane } = Tabs;
const Agent = () => {
  const {isSmallScreen} = useScreenWidth()
  const [filters, setFilters] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState<string>();
  const [debouncedSearchTerm] = useDebounce(searchInput, 500);
  const [activeTab, setActiveTab] = useState("0");
  const handleTabChange = (tabKey: any) => {
    setActiveTab(tabKey);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const setFilterValue = (value: any) => {
    setFilters(value);
  };

  const searchHandler = (e: any) => {
    e.preventDefault();

    console.log("Search Handler", searchInput);
    setSearchInput(searchInput);
  };
  return (
    <div id="available-list">
      <div className="agent-header">
        
        <div className={ isSmallScreen ? "hide" :"header-left"} >
          <h3>Delivery Partner Management</h3>
        </div>
        <div className="header-right">
          <form className="search-box" onSubmit={searchHandler}>
            <input
              type="text"
              name="search-input"
              value={searchInput}
              placeholder="Search"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
          {/* <div className="add-btn">
                <img src={AddIcon}  alt=''/>
             </div> */}
          <div className="filter-btn" onClick={handleOpenModal}>
            <img src={FilterIcon} alt="" />
          </div>
        </div>
      </div>
      <div className="content">
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="All Agents" key="0">
            <DeliveryAgents searchInput={debouncedSearchTerm} filters={filters} />
          </TabPane>
          <TabPane tab="Assigned Agents" key="1">
            <AssignedAgents activeTab={activeTab} />
          </TabPane>
        </Tabs>
      </div>
      <CustomModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        component={
          <AgentListFilter
            filters={filters}
            handleCloseModal={handleCloseModal}
            setFilters={setFilterValue}
          />
        }
        width={300}
      />
    </div>
  );
};

export default Agent;
