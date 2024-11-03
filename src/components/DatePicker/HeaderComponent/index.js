"use strict";
import React from "react";
import PropTypes from "prop-types";
import { monthStr } from "../utils/monthStr.js";

const HeaderComponent = ({ displayState, start, end, year, month }) => {
  const text = () => {
    let result = "";

    switch (displayState) {
      case 1:
        result = year;
        break;
      case 2:
        result = [start, end].join(" - ");
        break;
      default:
        result = [monthStr[month], year].join(" ");
    }

    return result;
  };

  return <>{text()}</>;
};

HeaderComponent.propTypes = {
  displayState: PropTypes.number.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
};

export default HeaderComponent;
