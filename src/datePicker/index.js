"use strict";
import React from "react";
import PropTypes from "prop-types";
import styles from "./datePicker.module.scss";
import DateComponent from "./dateComponent";
import MonthComponent from "./monthComponent";
import YearComponent from "./yearComponent";
import { MonthStr } from "./utils/monthStr.js";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    let selectObj = new Date(this.props.selectDate),
      selectYear = selectObj.getFullYear().toString(),
      selectMonth = selectObj.getMonth().toString();

    this.state = {
      datePickerState: 0,
      displayDate: true,
      displayMonth: false,
      displayYear: false,
      selectYear: selectYear,
      selectMonth: selectMonth,
      selectText: [MonthStr[selectMonth], selectYear].join(" "),
      dateProps: {
        year: selectYear,
        month: selectMonth,
        select: this.props.selectDate,
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
      datePickerState,
      displayDate,
      displayMonth,
      displayYear,
      selectYear,
      selectMonth,
      selectText,
      dateProps,
      monthProps,
      yearProps,
    } = this.state;

    const preBtnClick = () => {
      switch (datePickerState) {
        case 0:
          let preMonth = parseInt(dateProps.month) - 1;

          this.setState((state) => {
            if (preMonth < 0) {
              state.dateProps.month = "11";
              state.dateProps.year = (parseInt(dateProps.year) - 1).toString();
            } else {
              state.dateProps.month = preMonth.toString();
            }
            state.selectText = [
              MonthStr[state.dateProps.month],
              state.dateProps.year,
            ].join(" ");

            return state;
          });
          break;
        case 1:
          let preYear = parseInt(dateProps.year) - 1;

          this.setState((state) => {
            state.dateProps.year = preYear;
            state.selectText = preYear;
            if (preYear == selectYear) {
              state.monthProps.select = selectMonth;
            } else {
              state.monthProps.select = "";
            }
            return state;
          });
          break;
        case 2:
          let preState = parseInt(yearProps.start.slice(0, 3)) - 1;

          if (preState <= 99) {
            return;
          }

          this.setState((state) => {
            state.yearProps.start = preState + "0";
            state.yearProps.end = preState + "9";
            state.selectText = [
              state.yearProps.start,
              state.yearProps.end,
            ].join(" - ");

            return state;
          });
          break;
      }
    };

    const nextBtnClick = () => {
      switch (datePickerState) {
        case 0:
          let nextMonth = parseInt(dateProps.month) + 1;

          this.setState((state) => {
            console.log(nextMonth);
            if (nextMonth > 11) {
              state.dateProps.month = "0";
              state.dateProps.year = (parseInt(dateProps.year) + 1).toString();
            } else {
              state.dateProps.month = nextMonth.toString();
            }
            state.selectText = [
              MonthStr[state.dateProps.month],
              state.dateProps.year,
            ].join(" ");

            return state;
          });
          break;
        case 1:
          let nextYear = parseInt(dateProps.year) + 1;

          this.setState((state) => {
            state.dateProps.year = nextYear;
            state.selectText = nextYear;
            if (nextYear == selectYear) {
              state.monthProps.select = selectMonth;
            } else {
              state.monthProps.select = "";
            }
            return state;
          });
          break;
        case 2:
          let preState = parseInt(yearProps.start.slice(0, 3)) + 1;

          if (preState >= 1000) {
            return;
          }

          this.setState((state) => {
            state.yearProps.start = preState + "0";
            state.yearProps.end = preState + "9";
            state.selectText = [
              state.yearProps.start,
              state.yearProps.end,
            ].join(" - ");

            return state;
          });
          break;
      }
    };
    const yearBtnClick = () => {
      if (datePickerState >= 2) {
        return;
      }
      let updateSelectText = selectText;
      let displayDate,
        displayMonth,
        displayYear = false;

      switch (datePickerState) {
        case 0:
          displayMonth = true;
          updateSelectText = dateProps.year;
          break;
        case 1:
          displayYear = true;
          updateSelectText = [yearProps.start, yearProps.end].join(" - ");
          break;
        default:
          displayDate = true;
      }

      this.setState((state) => {
        state.datePickerState += 1;
        state.displayDate = displayDate;
        state.displayMonth = displayMonth;
        state.displayYear = displayYear;
        state.selectText = updateSelectText;

        return state;
      });
    };

    return (
      <section className={styles["date-picker"]}>
        <div className={styles.header}>
          <div className={styles.btn} onClick={preBtnClick}>
            &lt;
          </div>
          <div className={styles.info} onClick={yearBtnClick}>
            {selectText}
          </div>
          <div className={styles.btn} onClick={nextBtnClick}>
            &gt;
          </div>
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
