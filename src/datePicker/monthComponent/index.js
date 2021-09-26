"use strict";
import React from "react";
import PropTypes from "prop-types";
import styles from "./month.module.scss";
import { MonthStr } from "../utils/monthStr.js";
class MonthComponent extends React.Component {
  render() {
    const { select } = this.props;

    const monthList = () => {
      let result = [],
        month = 0;

      while (month < 12) {
        let className = "";
        if (select === month.toString()) {
          className = "select";
        }
        result.push({
          className: className,
          text: MonthStr[month],
        });
        month++;
      }

      return result;
    };
    return (
      <ul className={styles.month}>
        {monthList().map((month, index) => (
          <li key={index} className={styles[month.className]}>
            {month.text}
          </li>
        ))}
      </ul>
    );
  }
}

MonthComponent.propTypes = {
  select: PropTypes.string,
};
MonthComponent.defaultProps = {
  select: "",
};

export default MonthComponent;
