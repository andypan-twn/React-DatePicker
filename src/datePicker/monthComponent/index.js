"use strict";
import React from "react";
import PropTypes from "prop-types";
import styles from "./month.module.scss";

const MONTH_DATA = [
  {
    id: 1,
    text: "Jan",
  },
  {
    id: 2,
    text: "Feb",
  },
  {
    id: 3,
    text: "Mar",
  },
  {
    id: 4,
    text: "Apr",
  },
  {
    id: 5,
    text: "May",
  },
  {
    id: 6,
    text: "Jun",
  },
  {
    id: 7,
    text: "Jul",
  },
  {
    id: 8,
    text: "Aug",
  },
  {
    id: 9,
    text: "Sep",
  },
  {
    id: 10,
    text: "Oct",
  },
  {
    id: 11,
    text: "Nov",
  },
  {
    id: 12,
    text: "Dec",
  },
];
class MonthComponent extends React.Component {
  render() {
    const { select } = this.props;

    const monthList = () => {
      let result = MONTH_DATA;

      if (select != "") {
        result[select - 1].className = "select";
      }

      return result;
    };
    return (
      <ul className={styles.month}>
        {monthList().map((month) => (
          <li key={month.id} className={styles[month.className || ""]}>
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
