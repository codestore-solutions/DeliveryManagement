import React, { useState } from "react";
import { Button, DatePicker } from "antd";
import { Moment } from "moment";

interface DateRangeFilterProps {
  setSelectedDateRange: (dates: Moment[] | null) => void;
}

const { RangePicker } = DatePicker;

const DateRangePicker: React.FC<DateRangeFilterProps> = ({
  setSelectedDateRange,
}) => {
  const [selectedDates, setSelectedDates] = useState<any>(null);

  const handleDateChange = (dates: any) => {
    setSelectedDates(dates);
    setSelectedDateRange(dates);
  };
  const resetDateChange = () => {
    setSelectedDates(null);
    setSelectedDateRange(null);
  };
  return (
    <div id="range-picker">
      <RangePicker
        format="DD/MM/YYYY"
        value={selectedDates}
        onChange={handleDateChange}
        style={{ margin: "10px 15px" }}
      />
      <div
        className="btns"
        style={{ marginBottom: "10px", marginLeft: "15px" }}
      >
        <Button type="primary" style={{ margin: "10px" }}>
          Apply
        </Button>
        <Button type="default" onClick={resetDateChange}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default DateRangePicker;
