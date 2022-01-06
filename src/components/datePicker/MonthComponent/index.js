"use strict";
import React from "react";
import PropTypes from "prop-types";
import styles from "./month.module.scss";
import { monthStr } from "../utils/monthStr.js";

const MonthComponent = ({ select, onSelect }) => {
  const monthList = () => {
    let result = [],
      month = 0;

    while (month < 12) {
      let className = "";
      if (select === month.toString()) {
        className = "select";
      }
      result.push({
        id: month,
        className: className,
        text: monthStr[month],
      });
      month++;
    }

    return result;
  };

  return (
    <ul className={styles.month}>
      {monthList().map((month) => (
        <li
          key={month.id}
          className={styles[month.className]}
          onClick={() => onSelect(month.id)}
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
  onSelect: () => {},
};

export default MonthComponent;
