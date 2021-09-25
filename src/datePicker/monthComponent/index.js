"use strict";
import React from "react";
import styles from "./month.module.scss";

const MONTH_LIST = [
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
    className: "select",
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
    return (
      <ul className={styles.month}>
        {MONTH_LIST.map((month) => (
          <li key={month.id} className={styles[month.className || ""]}>
            {month.text}
          </li>
        ))}
      </ul>
    );
  }
}

export default MonthComponent;
