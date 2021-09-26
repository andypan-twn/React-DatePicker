"use strict";
import React from "react";
import PropTypes from "prop-types";
import { MonthStr } from "../utils/monthStr.js";

class HeaderComponent extends React.Component {
  render() {
    const text = () => {
      let result = "";

      switch (this.props.displayState) {
        case 1:
          result = this.props.year;
          break;
        case 2:
          result = [this.props.start, this.props.end].join(" - ");
          break;
        default:
          result = [MonthStr[this.props.month], this.props.year].join(" ");
      }
      return result;
    };

    return <>{text()}</>;
  }
}

HeaderComponent.propTypes = {
  displayState: PropTypes.number,
  start: PropTypes.string,
  end: PropTypes.string,
  year: PropTypes.string,
  month: PropTypes.string,
};

export default HeaderComponent;
