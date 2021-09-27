"use strict";
import React from "react";
import PropTypes from "prop-types";
import styles from "./datePicker.module.scss";
import DateComponent from "./dateComponent";
import MonthComponent from "./monthComponent";
import YearComponent from "./yearComponent";
import HeaderComponent from "./headerComponent";
import { NumToTwoDigitStr } from "./utils/numToTwoDigitStr";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.initState(this.props.selectDate);
  }

  componentDidUpdate(prevProps) {
    let unlessPropsUpdate = this.props.selectDate === prevProps.selectDate;
    if (unlessPropsUpdate) {
      return;
    }
    if (isNaN(new Date(this.props.selectDate).getTime())) {
      this.setState(this.initState("")); //Invalid input text.
    } else {
      this.setState(this.initState(this.props.selectDate));
    }
  }
  initState(selectDate) {
    let selectObj;
    if (selectDate == "") {
      selectObj = new Date();
    } else {
      selectObj = new Date(selectDate);
    }

    let selectYear = selectObj.getFullYear().toString(),
      selectMonth = selectObj.getMonth().toString();

    return {
      datePickerState: 0,
      displayDate: true,
      displayMonth: false,
      displayYear: false,
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

  processDisplayStatus(status) {
    if (status >= 3) {
      return;
    }
    let displayDate,
      displayMonth,
      displayYear = false;

    switch (status) {
      case 0:
        displayDate = true;
        break;
      case 1:
        displayMonth = true;
        break;
      case 2:
        displayYear = true;
        break;
    }

    this.setState((state) => {
      state.datePickerState = status;
      state.displayDate = displayDate;
      state.displayMonth = displayMonth;
      state.displayYear = displayYear;

      return state;
    });
  }

  processMonth(month) {
    this.setState((state) => {
      if (month < 0) {
        state.dateProps.month = "11";
        state.dateProps.year = (parseInt(state.dateProps.year) - 1).toString();
      } else if (month > 11) {
        state.dateProps.month = "0";
        state.dateProps.year = (parseInt(state.dateProps.year) + 1).toString();
      } else {
        state.dateProps.month = month.toString();
      }

      return state;
    });
  }

  processYear(year) {
    this.setState((state) => {
      state.dateProps.year = year.toString();
      if (year == state.yearProps.select) {
        state.monthProps.select = state.dateProps.month;
      } else {
        state.monthProps.select = "";
      }
      return state;
    });
  }

  processTenYear(input) {
    if (input <= 99 || input >= 1000) {
      return;
    }

    this.setState((state) => {
      state.yearProps.start = input + "0";
      state.yearProps.end = input + "9";

      return state;
    });
  }

  render() {
    const {
      datePickerState,
      displayDate,
      displayMonth,
      displayYear,
      dateProps,
      monthProps,
      yearProps,
    } = this.state;

    const preBtnClick = () => {
      switch (datePickerState) {
        case 0:
          this.processMonth(parseInt(dateProps.month) - 1);
          break;
        case 1:
          this.processYear(parseInt(dateProps.year) - 1);
          break;
        case 2:
          this.processTenYear(parseInt(yearProps.start.slice(0, 3)) - 1);
          break;
      }
    };

    const nextBtnClick = () => {
      switch (datePickerState) {
        case 0:
          this.processMonth(parseInt(dateProps.month) + 1);
          break;
        case 1:
          this.processYear(parseInt(dateProps.year) + 1);
          break;
        case 2:
          this.processTenYear(parseInt(yearProps.start.slice(0, 3)) + 1);
          break;
      }
    };

    const yearBtnClick = () => {
      this.processDisplayStatus(datePickerState + 1);
    };

    const onSelectDate = (date) => {
      this.setState(
        (state) => {
          let year = state.dateProps.year,
            month = state.dateProps.month;

          state.yearProps.select = year;
          state.monthProps.select = month;
          state.dateProps.select = [
            year,
            NumToTwoDigitStr(parseInt(month) + 1),
            NumToTwoDigitStr(date),
          ].join("-");

          return state;
        },
        () => {
          this.props.onSelect(dateProps.select);
        }
      );
    };

    const onSelectMonth = (month) => {
      this.processDisplayStatus(datePickerState - 1);
      this.setState((state) => {
        state.dateProps.month = month.toString();
        return state;
      });
    };

    const onSelectYear = (year) => {
      this.processDisplayStatus(datePickerState - 1);
      this.processYear(parseInt(year));
      this.setState((state) => {
        state.dateProps.year = year.toString();
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
            <HeaderComponent
              start={yearProps.start}
              end={yearProps.end}
              year={dateProps.year}
              month={dateProps.month}
              displayState={datePickerState}
            ></HeaderComponent>
          </div>
          <div className={styles.btn} onClick={nextBtnClick}>
            &gt;
          </div>
        </div>
        {displayDate && (
          <DateComponent {...dateProps} onSelect={onSelectDate}></DateComponent>
        )}
        {displayMonth && (
          <MonthComponent
            {...monthProps}
            onSelect={onSelectMonth}
          ></MonthComponent>
        )}
        {displayYear && (
          <YearComponent {...yearProps} onSelect={onSelectYear}></YearComponent>
        )}
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
