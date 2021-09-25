"use strict";
import React from "react";
import styles from "./week.module.scss";

const DAY_LIST = [
  {
    id: 0,
    text: "Su",
  },
  {
    id: 1,
    text: "Mo",
  },
  {
    id: 2,
    text: "Tu",
  },
  {
    id: 3,
    text: "We",
  },
  {
    id: 4,
    text: "Th",
  },
  {
    id: 5,
    text: "Fr",
  },
  {
    id: 6,
    text: "Sa",
  },
];
class Week extends React.Component {
  render() {
    return (
      <div className={styles.week}>
        {DAY_LIST.map((day) => (
          <span key={day.id}>{day.text}</span>
        ))}
      </div>
    );
  }
}

export default Week;
