"use strict";
import React from "react";
import PropTypes from "prop-types";
import styles from "./datePicker.module.scss";
import DateComponent from "./dateComponent";
import MonthComponent from "./monthComponent";
import YearComponent from "./yearComponent";

const MONTH_STR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    let selectObj = new Date(props.selectDate),
      selectYear = selectObj.getFullYear().toString(),
      selectMonth = selectObj.getMonth().toString();

    this.state = {
      displayDate: true,
      displayMonth: false,
      displayYear: false,
      selectText: [MONTH_STR[selectMonth], selectYear].join(" "),
      dateProps: {
        year: selectYear,
        month: selectMonth,
        select: props.selectDate,
      },
      monthProps: {
        select: selectMonth,
      },
      yearProps: {
        start: selectYear.slice(0, 3) + "0",
        end: selectYear.slice(0, 3) + "9",
        select: selectYear,
      },
    };
  }

  render() {
    const {
      displayDate,
      displayMonth,
      displayYear,
      selectText,
      dateProps,
      monthProps,
      yearProps,
    } = this.state;
    return (
      <section className={styles["date-picker"]}>
        <div className={styles.header}>
          <div className={styles.btn}>&lt;</div>
          <div className={styles.info}>{selectText}</div>
          <div className={styles.btn}>&gt;</div>
        </div>
        {displayDate && <DateComponent {...dateProps}></DateComponent>}
        {displayMonth && <MonthComponent {...monthProps}></MonthComponent>}
        {displayYear && <YearComponent {...yearProps}></YearComponent>}
      </section>
    );
  }
}

DatePicker.propTypes = {
  selectDate: PropTypes.string,
  onSelect: PropTypes.func,
};

DatePicker.defaultProps = {
  selectDate: new Date().toISOString().slice(0, 10),
};

export default DatePicker;
