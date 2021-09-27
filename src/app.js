import React from "react";
import ReactDom from "react-dom";
import DatePicker from "./datePicker";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayDatePicker: false,
      date: new Date().toISOString().slice(0, 10),
    };
  }

  render() {
    const { displayDatePicker } = this.state;

    const processInputChange = (e) => {
      let changeValue = e.target.value;
      this.setState((state) => {
        state.date = changeValue;
        return state;
      });
    };

    const handleFocus = () => {
      this.setState((state) => {
        state.displayDatePicker = true;
        return state;
      });
    };

    const handleSelect = (dateStr) => {
      this.setState((state) => {
        state.displayDatePicker = false;
        state.date = dateStr;
        return state;
      });
    };

    return (
      <>
        <input
          type="text"
          name="date"
          value={this.state.date}
          onChange={processInputChange}
          onFocus={handleFocus}
        />
        {displayDatePicker && (
          <DatePicker selectDate={this.state.date} onSelect={handleSelect} />
        )}
      </>
    );
  }
}

ReactDom.render(<App></App>, document.getElementById("app"));
