"use strict";
import React from "react";
import styles from "./week.module.scss";

class Week extends React.Component {
  render() {
    return (
      <div className={styles.week}>
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
      </div>
    );
  }
}

export default Week;
