import { Tabs } from "antd";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import DeliveryAgents from "./DeliveryAgents";
import { AssignedAgents } from "..";
import "./style.scss";
import useScreenWidth from "../../Hooks/ScreenWidthHook";

const { TabPane } = Tabs;

const Agent = () => {
  const { isSmallScreen, } = useScreenWidth();
  const [filters, setFilters] = useState<any>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [activeTab, setActiveTab] = useState("0");
  const [debouncedSearchTerm] = useDebounce(searchInput.trim(), 500);

  const handleTabChange = (tabKey: any) => {
    setActiveTab(tabKey);
  };

  const setFiltersInput = (input: any) => {
    setFilters(input);
  };

  return (
    <div id="available-list">
      <div className="agent-header">
        <div className={isSmallScreen ? "hide" : "header-left"}>
          <h3>Delivery Partner Management</h3>
        </div>
        <div className="header-right">
          {activeTab === "0" && (
            <form
              className={isSmallScreen? "search-box-sm": "search-box"}
              onSubmit={(e) => {
                e.preventDefault();
                // No need to handle search here
              }}
            >
              <input
                type="text"
                name="search-input"
                value={searchInput}
                placeholder="Search"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
          )}
        </div>
      </div>
      <div className="content">
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="All Agents" key="0">
            <DeliveryAgents
              searchInput={debouncedSearchTerm}
              filters={filters}
              setFiltersInput={setFiltersInput}
            />
          </TabPane>
          <TabPane tab="Assigned Agents" key="1">
            <AssignedAgents
              activeTab={activeTab}
              searchInput={debouncedSearchTerm}
              filters={filters}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Agent;
