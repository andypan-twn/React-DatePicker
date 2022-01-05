"use strict";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./datePicker.module.scss";
import DateComponent from "./dateComponent";
import MonthComponent from "./monthComponent";
import YearComponent from "./yearComponent";
import HeaderComponent from "./HeaderComponent";
import { numToTwoDigitStr } from "./utils/numToTwoDigitStr";

const initState = (selectDate = "") => {
  let selectDateObj = new Date(selectDate);
  if (isNaN(selectDateObj.getTime())) {
    selectDateObj = new Date(); //Invalid input text.
  }

  let selectYear = selectDateObj.getFullYear().toString(),
    selectMonth = selectDateObj.getMonth().toString();

  return {
    datePropsData: {
      year: selectYear,
      month: selectMonth,
      select: selectDate,
    },
    monthPropsData: {
      select: selectMonth,
    },
    yearPropsData: {
      start: selectYear.slice(0, 3) + "0",
      end: selectYear.slice(0, 3) + "9",
      select: selectYear,
    },
  };
};

const DatePicker = ({ selectDate, onSelect }) => {
  const [displayStatus, setDisplayStatus] = useState(0);
  const [displayComponent, setDisplayComponent] = useState({
    date: true,
    month: false,
    year: false,
  });
  useEffect(() => {
    let newDisplay = { date: false, month: false, year: false };

    switch (displayStatus) {
      case 0:
        newDisplay.date = true;
        break;
      case 1:
        newDisplay.month = true;
        break;
      case 2:
        newDisplay.year = true;
        break;
    }
    setDisplayComponent(newDisplay);
  }, [displayStatus]);

  const { datePropsData, monthPropsData, yearPropsData } = initState();
  const [dateProps, setDateProps] = useState(datePropsData);
  const [monthProps, setMonthProps] = useState(monthPropsData);
  const [yearProps, setYearProps] = useState(yearPropsData);

  useEffect(() => {
    const { datePropsData, monthPropsData, yearPropsData } =
      initState(selectDate);

    setDateProps(datePropsData);
    setMonthProps(monthPropsData);
    setYearProps(yearPropsData);
  }, [selectDate]);

  const processMonth = (inputMonth) => {
    let month, year;

    if (inputMonth < 0) {
      month = "11";
      year = (parseInt(dateProps.year) - 1).toString();
    } else if (inputMonth > 11) {
      month = "0";
      year = (parseInt(dateProps.year) + 1).toString();
    } else {
      month = inputMonth.toString();
      year = dateProps.year;
    }

    setDateProps({
      ...dateProps,
      month: month,
      year: year,
    });
  };

  const processYear = (inputYear) => {
    setDateProps({
      ...dateProps,
      year: inputYear.toString(),
    });

    setMonthProps({
      select: yearProps.select === inputYear ? dateProps.month : "",
    });
  };

  const processTenYear = (input) => {
    if (input <= 99 || input >= 1000) {
      return;
    }

    setYearProps({
      ...yearProps,
      start: `${input}0`,
      end: `${input}9`,
    });
  };

  const preBtnClick = () => {
    switch (displayStatus) {
      case 0:
        processMonth(parseInt(dateProps.month) - 1);
        break;
      case 1:
        processYear(parseInt(dateProps.year) - 1);
        break;
      case 2:
        processTenYear(parseInt(yearProps.start.slice(0, 3)) - 1);
        break;
    }
  };

  const nextBtnClick = () => {
    switch (displayStatus) {
      case 0:
        processMonth(parseInt(dateProps.month) + 1);
        break;
      case 1:
        processYear(parseInt(dateProps.year) + 1);
        break;
      case 2:
        processTenYear(parseInt(yearProps.start.slice(0, 3)) + 1);
        break;
    }
  };

  const onSelectDate = (date) => {
    const { year, month } = dateProps;
    const datePropsSelect = [
      year,
      numToTwoDigitStr(parseInt(month) + 1),
      numToTwoDigitStr(date),
    ].join("-");

    setDateProps({
      year: year,
      month: month,
      select: datePropsSelect,
    });
    setMonthProps({
      select: month,
    });
    setYearProps({
      ...yearProps,
      select: year,
    });

    onSelect(datePropsSelect);
  };

  const onSelectMonth = (month) => {
    setDisplayStatus(displayStatus - 1);

    setDateProps({
      ...dateProps,
      month: month.toString(),
    });
  };

  const onSelectYear = (year) => {
    setDisplayStatus(displayStatus - 1);

    setDateProps({
      ...dateProps,
      year: year.toString(),
    });

    setMonthProps({
      select: yearProps.select === year ? dateProps.month : "",
    });
  };

  return (
    <section className={styles["date-picker"]}>
      <div className={styles.header}>
        <div className={styles.btn} onClick={preBtnClick}>
          &lt;
        </div>
        <div
          className={styles.info}
          onClick={() =>
            displayStatus < 2 && setDisplayStatus(displayStatus + 1)
          }
        >
          <HeaderComponent
            start={yearProps.start}
            end={yearProps.end}
            year={dateProps.year}
            month={dateProps.month}
            displayState={displayStatus}
          ></HeaderComponent>
        </div>
        <div className={styles.btn} onClick={nextBtnClick}>
          &gt;
        </div>
      </div>
      {displayComponent.date && (
        <DateComponent {...dateProps} onSelect={onSelectDate}></DateComponent>
      )}
      {displayComponent.month && (
        <MonthComponent
          {...monthProps}
          onSelect={onSelectMonth}
        ></MonthComponent>
      )}
      {displayComponent.year && (
        <YearComponent {...yearProps} onSelect={onSelectYear}></YearComponent>
      )}
    </section>
  );
};

DatePicker.propTypes = {
  selectDate: PropTypes.string,
  onSelect: PropTypes.func,
};

DatePicker.defaultProps = {
  selectDate: new Date().toISOString().slice(0, 10),
};

export default DatePicker;
