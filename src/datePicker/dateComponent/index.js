"use strict";
import React from "react";
import PropTypes from "prop-types";
import styles from "./date.module.scss";
import WeekComponent from "./weekComponent";

const DATE_LENGTH = 7 * 6;

class DateComponent extends React.Component {
  constructor(props) {
    super(props);

    let y = props.year;
    let m = props.month;

    let selectObj = new Date(props.select),
      selectYear = selectObj.getFullYear(),
      selectDate = selectObj.getDate(),
      isSelectThisYear = selectYear == y,
      isSelectThisMonth = false;

    if (isSelectThisYear) {
      let selectMonth = selectObj.getMonth();

      isSelectThisMonth = selectMonth == m;
    }

    this.state = {
      year: props.year,
      month: props.month,
      selectDate: selectDate,
      isSelectThisMonth: isSelectThisMonth,
    };
  }

  render() {
    const { year, month, selectDate, isSelectThisMonth } = this.state;

    const preDateList = () => {
      let firstDateOfMonth = new Date(year, month, 1),
        preMonth = month - 1,
        diff = firstDateOfMonth.getDay(); // return day of the week

      let result = [];
      while (diff > 0) {
        let preDate = new Date(year, preMonth, 1 - diff);
        let date = preDate.getDate();

        result.push({
          id: `${preMonth}_${date}`,
          className: styles.disable,
          text: date,
        });

        diff--;
      }

      return result;
    };

    const thisDateList = () => {
      let today = new Date(),
        todayOfYear = today.getFullYear(),
        todayOfMonth = today.getMonth(),
        todayOfDate = today.getDate();

      let lastOfDate = new Date(year, month + 1, 0).getDate();

      let checkTodayOfDate = false;
      if (todayOfYear == year && todayOfMonth == month) {
        checkTodayOfDate = true;
      }

      let result = [];
      let dateInfo = 1;
      while (dateInfo <= lastOfDate) {
        let classNameArr = [];
        if (checkTodayOfDate && todayOfDate == dateInfo) {
          classNameArr.push(styles.today);
        }
        if (isSelectThisMonth && selectDate == dateInfo) {
          classNameArr.push(styles.select);
        }

        result.push({
          id: `${month}_${dateInfo}`,
          key: dateInfo,
          className: classNameArr.join(" "),
          text: dateInfo,
        });

        dateInfo++;
      }

      return result;
    };

    const dataList = () => {
      let result = [...preDateList(), ...thisDateList()];

      let lessLength = DATE_LENGTH - result.length;

      let nextDate = 1;
      while (lessLength > 0) {
        result.push({
          id: `${month + 1}_${nextDate}`,
          className: styles.disable,
          text: nextDate,
        });

        nextDate++;
        lessLength--;
      }

      return result;
    };

    return (
      <>
        <WeekComponent></WeekComponent>
        <ul className={styles.day}>
          {dataList().map((data) => (
            <li key={data.id} className={data.className}>
              {data.text}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

DateComponent.propTypes = {
  year: PropTypes.string,
  month: PropTypes.string,
  select: PropTypes.string,
};
DateComponent.defaultProps = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  select: "",
};

export default DateComponent;
