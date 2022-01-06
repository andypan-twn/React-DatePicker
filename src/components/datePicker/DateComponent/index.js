"use strict";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./date.module.scss";
import WeekComponent from "./WeekComponent";

const DATE_LENGTH = 7 * 6;

const DateComponent = ({ select, onSelect, ...props }) => {
  const year = parseInt(props.year);
  const month = parseInt(props.month);

  const preDateList = () => {
    const firstDateOfMonth = new Date(year, month, 1);
    const preMonth = month - 1;

    let diff = firstDateOfMonth.getDay(); // return day of the week
    let result = [];
    while (diff > 0) {
      const preDate = new Date(year, preMonth, 1 - diff);
      const date = preDate.getDate();

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

  const thisDateList = () => {
    const today = new Date(),
      todayOfYear = today.getFullYear(),
      todayOfMonth = today.getMonth(),
      todayOfDate = today.getDate();

    const lastOfDate = new Date(year, month + 1, 0).getDate();

    let checkTodayOfDate = false;
    if (todayOfYear === year && todayOfMonth === month) {
      checkTodayOfDate = true;
    }

    let result = [];
    let dateInfo = 1;
    while (dateInfo <= lastOfDate) {
      let classNameArr = [];
      if (checkTodayOfDate && todayOfDate === dateInfo) {
        classNameArr.push(styles.today);
      }
      if (
        selectState.isSelectThisMonth &&
        selectState.selectDate === dateInfo
      ) {
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

  const dataList = () => {
    let result = [...preDateList(), ...thisDateList()];

    let lessLength = DATE_LENGTH - result.length;

    let nextDate = 1;
    while (lessLength > 0) {
      result.push({
        id: `${month + 1}_${nextDate}`,
        disable: true,
        className: styles.disable,
        text: nextDate,
      });

      nextDate++;
      lessLength--;
    }

    return result;
  };

  const processSelect = () => {
    const selectObj = new Date(select),
      selectYear = selectObj.getFullYear(),
      selectDate = selectObj.getDate();
    let isSelectThisMonth = false;

    if (selectYear === year) {
      let selectMonth = selectObj.getMonth();

      isSelectThisMonth = selectMonth === month;
    }

    return {
      selectDate: selectDate,
      isSelectThisMonth: isSelectThisMonth,
    };
  };

  const [selectState, setSelectState] = useState(processSelect());

  useEffect(() => {
    setSelectState(processSelect());
  }, [month, select]);

  return (
    <>
      <WeekComponent />
      <ul className={styles.day}>
        {dataList().map((data) => (
          <li
            key={data.id}
            className={data.className}
            onClick={() => data.disable || onSelect(data.text)}
          >
            {data.text}
          </li>
        ))}
      </ul>
    </>
  );
};

DateComponent.propTypes = {
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  select: PropTypes.string,
  onSelect: PropTypes.func,
};

DateComponent.defaultProps = {
  select: "",
  onSelect: () => {},
};

export default DateComponent;
