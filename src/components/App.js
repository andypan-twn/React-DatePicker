import React, { useState } from "react";
import DatePicker from "./datePicker";

const App = () => {
  const [state, setState] = useState({
    displayDatePicker: false,
    inputDate: new Date().toISOString().slice(0, 10),
  });

  const processInputChange = (e) => {
    setState({
      ...state,
      inputDate: e.target.value,
    });
  };

  const handleFocus = () => {
    setState({
      ...state,
      displayDatePicker: true,
    });
  };

  const handleSelect = (dateStr, isClose = false) => {
    setState({
      displayDatePicker: false,
      inputDate: dateStr,
    });
  };

  return (
    <>
      <input
        type="text"
        name="date"
        value={state.inputDate}
        onChange={processInputChange}
        onFocus={handleFocus}
      />
      {state.displayDatePicker && (
        <DatePicker selectDate={state.inputDate} onSelect={handleSelect} />
      )}
    </>
  );
};

export default App;
