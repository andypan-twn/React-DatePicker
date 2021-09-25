"use strict";
import React from "react";
import styles from "./index.module.scss";
import Week from "./week";

const DATE_LENGTH = 7 * 6;

class Day extends React.Component {
  render() {
    const preDateList = (y, m) => {
      let firstDateOfMonth = new Date(y, m, 1),
        diff = firstDateOfMonth.getDay(); // return day of the week

      let result = [];
      while (diff > 0) {
        let preDate = new Date(y, m - 1, 1 - diff);
        let date = preDate.getDate();

        result.push({
          id: `${m - 1}_${date}`,
          className: styles.disable,
          text: date,
        });

        diff--;
      }

      return result;
    };

    const thisDateList = (y, m) => {
      let today = new Date(),
        todayOfYear = today.getFullYear(),
        todayOfMonth = today.getMonth(),
        todayOfDate = today.getDate();

      let lastOfDate = new Date(y, m + 1, 0).getDate();

      let checkToday = false;
      if (todayOfYear === y && todayOfMonth === m) {
        checkToday = true;
      }

      let result = [];
      let dateInfo = 1;
      while (dateInfo <= lastOfDate) {
        let classNameArr = [];
        if (checkToday && todayOfDate === dateInfo) {
          classNameArr.push(styles.today);
          classNameArr.push(styles.select);
        }

        result.push({
          id: `${m}_${dateInfo}`,
          key: dateInfo,
          className: classNameArr.join(" "),
          text: dateInfo,
        });

        dateInfo++;
      }

      return result;
    };

    const dataList = () => {
      let currentDate = new Date(),
        y = currentDate.getFullYear(),
        m = currentDate.getMonth();

      let result = [...preDateList(y, m), ...thisDateList(y, m)];

      let lessLength = DATE_LENGTH - result.length;

      let nextDate = 1;
      while (lessLength > 0) {
        result.push({
          id: `${m + 1}_${nextDate}`,
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
        <Week></Week>
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

export default Day;
