import React from "react";
import ReactDom from "react-dom";
import DatePicker from "./datePicker";
class App extends React.Component {
  constructor(props) {
    super(props);
    let defaultDate = new Date().toISOString().slice(0, 10);
    this.state = {
      defaultDate: defaultDate,
      date: defaultDate,
    };
  }

  render() {
    const processInputChange = (e) => {
      let changeValue = e.target.value;
      this.setState({
        defaultDate: changeValue,
        date: changeValue,
      });
    };
    return (
      <>
        <input
          type="text"
          name="date"
          value={this.state.date}
          onChange={processInputChange}
        />
        <DatePicker
          selectDate={this.state.defaultDate}
          onSelect={(dateStr) => {
            this.setState({ date: dateStr });
          }}
        />
      </>
    );
  }
}

ReactDom.render(<App></App>, document.getElementById("app"));
