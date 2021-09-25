"use strict";
import React from "react";
import styles from "./datePicker.module.scss";
import DateComponent from "./dateComponent";
import MonthComponent from "./monthComponent";
import YearComponent from "./yearComponent";

class DatePicker extends React.Component {
  render() {
    return (
      <section className={styles["date-picker"]}>
        <div className={styles.header}>
          <div className={styles.btn}>&lt;</div>
          <div className={styles.info}>Sep 2021</div>
          <div className={styles.btn}>&gt;</div>
        </div>
        <DateComponent></DateComponent>
        <MonthComponent></MonthComponent>
        <YearComponent></YearComponent>
      </section>
    );
  }
}

export default DatePicker;
