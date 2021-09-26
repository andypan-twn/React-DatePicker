import React from "react";
import ReactDom from "react-dom";
import DatePicker from "./datePicker";

ReactDom.render(
  <DatePicker onSelect={(dateStr) => alert(`you select ${dateStr}`)} />,
  document.getElementById("app")
);
