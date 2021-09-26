"use strict";
import React from "react";
import PropTypes from "prop-types";
import styles from "./month.module.scss";

const MONTH_DATA = [
  {
    text: "Jan",
  },
  {
    text: "Feb",
  },
  {
    text: "Mar",
  },
  {
    text: "Apr",
  },
  {
    text: "May",
  },
  {
    text: "Jun",
  },
  {
    text: "Jul",
  },
  {
    text: "Aug",
  },
  {
    text: "Sep",
  },
  {
    text: "Oct",
  },
  {
    text: "Nov",
  },
  {
    text: "Dec",
  },
];
class MonthComponent extends React.Component {
  render() {
    const { select } = this.props;

    const monthList = () => {
      let result = MONTH_DATA;

      if (select != "") {
        result[select].className = "select";
      }

      return result;
    };
    return (
      <ul className={styles.month}>
        {monthList().map((month, index) => (
          <li key={index} className={styles[month.className || ""]}>
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
