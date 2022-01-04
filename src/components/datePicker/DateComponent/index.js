"use strict";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./date.module.scss";
import WeekComponent from "./WeekComponent";

const DATE_LENGTH = 7 * 6;

const preDateList = (year, month) => {
  let firstDateOfMonth = new Date(year, month, 1),
    preMonth = parseInt(month) - 1,
    diff = firstDateOfMonth.getDay(); // return day of the week

  let result = [];
  while (diff > 0) {
    let preDate = new Date(year, preMonth, 1 - diff);
    let date = preDate.getDate();

    result.push({
      id: `${preMonth}_${date}`,
      disable: true,
      className: styles.disable,
      text: date,
    });

    diff--;
  }

  return result;
};

const thisDateList = (year, month, selectDate, isSelectThisMonth) => {
  let today = new Date(),
    todayOfYear = today.getFullYear(),
    todayOfMonth = today.getMonth(),
    todayOfDate = today.getDate();

  let lastOfDate = new Date(year, parseInt(month) + 1, 0).getDate();

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
      disable: false,
      className: classNameArr.join(" "),
      text: dateInfo,
    });

    dateInfo++;
  }

  return result;
};

const dataList = (year, month, selectDate, isSelectThisMonth) => {
  let result = [
    ...preDateList(year, month),
    ...thisDateList(year, month, selectDate, isSelectThisMonth),
  ];

  let lessLength = DATE_LENGTH - result.length;

  let nextDate = 1;
  while (lessLength > 0) {
    result.push({
      id: `${parseInt(month) + 1}_${nextDate}`,
      disable: true,
      className: styles.disable,
      text: nextDate,
    });

    nextDate++;
    lessLength--;
  }

  return result;
};

const processSelect = (y, m, select) => {
  let selectObj = new Date(select),
    selectYear = selectObj.getFullYear(),
    selectDate = selectObj.getDate(),
    isSelectThisYear = selectYear == y,
    isSelectThisMonth = false;

  if (isSelectThisYear) {
    let selectMonth = selectObj.getMonth();

    isSelectThisMonth = selectMonth == m;
  }

  return {
    selectDate: selectDate,
    isSelectThisMonth: isSelectThisMonth,
  };
};

const DateComponent = ({ year, month, select, onSelect }) => {
  const [state, setState] = useState(processSelect(year, month, select));
  const { selectDate, isSelectThisMonth } = state;

  useEffect(() => {
    setState(processSelect(year, month, select));
  }, [month, select]);

  const handleClick = (data) => {
    if (data.disable) {
      return;
    }
    onSelect(data.text);
  };

  return (
    <>
      <WeekComponent />
      <ul className={styles.day}>
        {dataList(year, month, selectDate, isSelectThisMonth).map((data) => (
          <li
            key={data.id}
            className={data.className}
            onClick={() => handleClick(data)}
          >
            {data.text}
          </li>
        ))}
      </ul>
    </>
  );
};

DateComponent.propTypes = {
  year: PropTypes.string,
  month: PropTypes.string,
  select: PropTypes.string,
  onSelect: PropTypes.func,
};

DateComponent.defaultProps = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  select: "",
};

export default DateComponent;
