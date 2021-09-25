"use strict";
import React from "react";
import styles from "./index.module.scss";
import Day from "./day";
import Month from "./month";
import Year from "./Year";

class DatePicker extends React.Component {
  render() {
    return (
      <section className={styles["date-picker"]}>
        <div className={styles.header}>
          <div className={styles.btn}>&lt;</div>
          <div className={styles.info}>Sep 2021</div>
          <div className={styles.btn}>&gt;</div>
        </div>
        <Day></Day>
        <Month></Month>
        <Year></Year>
      </section>
    );
  }
}

export default DatePicker;
