"use strict";
import React from "react";
import PropTypes from "prop-types";
import styles from "./month.module.scss";
import { monthStr } from "../utils/monthStr.js";

const monthList = (select) => {
  let result = [],
    month = 0;

  while (month < 12) {
    let className = "";
    if (select === month.toString()) {
      className = "select";
    }
    result.push({
      className: className,
      text: monthStr[month],
    });
    month++;
  }

  return result;
};

const MonthComponent = ({ select, onSelect }) => {
  return (
    <ul className={styles.month}>
      {monthList(select).map((month, index) => (
        <li
          key={index}
          className={styles[month.className]}
          onClick={() => onSelect(index)}
        >
          {month.text}
        </li>
      ))}
    </ul>
  );
};

MonthComponent.propTypes = {
  select: PropTypes.string,
  onSelect: PropTypes.func,
};

MonthComponent.defaultProps = {
  select: "",
};

export default MonthComponent;
