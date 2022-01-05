import React, { useState } from "react";
import DatePicker from "./datePicker";

const App = () => {
  const [displayDatePicker, setDisplayDatePicker] = useState(false);
  const [inputDate, setInputDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const handleSelect = (dateStr) => {
    setDisplayDatePicker(false);
    setInputDate(dateStr);
  };

  return (
    <>
      <input
        type="text"
        name="date"
        value={inputDate}
        onChange={(e) => setInputDate(e.target.value)}
        onFocus={() => setDisplayDatePicker(true)}
      />
      {displayDatePicker && (
        <DatePicker selectDate={inputDate} onSelect={handleSelect} />
      )}
    </>
  );
};

export default App;
