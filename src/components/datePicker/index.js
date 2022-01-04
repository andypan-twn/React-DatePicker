"use strict";
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./datePicker.module.scss";
import DateComponent from "./dateComponent";
import MonthComponent from "./monthComponent";
import YearComponent from "./yearComponent";
import HeaderComponent from "./HeaderComponent";
import { numToTwoDigitStr } from "./utils/numToTwoDigitStr";

const initState = (selectDate) => {
  let selectObj;
  if (selectDate) {
    selectObj = new Date(selectDate);
  } else {
    selectObj = new Date();
  }

  let selectYear = selectObj.getFullYear().toString(),
    selectMonth = selectObj.getMonth().toString();

  return {
    datePickerState: 0,
    displayDate: true,
    displayMonth: false,
    displayYear: false,
    closeSelf: false,
    dateProps: {
      year: selectYear,
      month: selectMonth,
      select: selectDate,
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
};

const processDisplayStatus = (status) => {
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

  return {
    datePickerState: status,
    displayDate: displayDate,
    displayMonth: displayMonth,
    displayYear: displayYear,
  };
};

const processMonth = (inputMonth, dateProps) => {
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

  return {
    dateProps: {
      ...dateProps,
      month: month,
      year: year,
    },
  };
};

const processYear = (inputYear, yearProps, dateProps) => {
  return {
    dateProps: {
      ...dateProps,
      year: inputYear.toString(),
    },
    monthProps: {
      select: yearProps.select === inputYear ? dateProps.month : "",
    },
  };
};

const processTenYear = (input, yearProps) => {
  if (input <= 99 || input >= 1000) {
    return;
  }

  return {
    yearProps: {
      ...yearProps,
      start: `${input}0`,
      end: `${input}9`,
    },
  };
};

const DatePicker = ({ selectDate, onSelect }) => {
  const [state, setState] = useState(initState(selectDate));
  const {
    datePickerState,
    displayDate,
    displayMonth,
    displayYear,
    dateProps,
    monthProps,
    yearProps,
  } = state;

  useEffect(() => {
    if (isNaN(new Date(selectDate).getTime())) {
      setState(initState("")); //Invalid input text.
    } else {
      setState(initState(selectDate));
    }
  }, [selectDate]);

  useEffect(() => {
    return () => onSelect(state.dateProps.select);
  }, [state.dateProps.select]);

  const preBtnClick = () => {
    let newState;

    switch (datePickerState) {
      case 0:
        newState = processMonth(parseInt(dateProps.month) - 1, dateProps);
        break;
      case 1:
        newState = processYear(
          parseInt(dateProps.year) - 1,
          yearProps,
          dateProps
        );
        break;
      case 2:
        newState = processTenYear(
          parseInt(yearProps.start.slice(0, 3)) - 1,
          yearProps
        );
        break;
    }

    setState({
      ...state,
      ...newState,
    });
  };

  const nextBtnClick = () => {
    let newState;

    switch (datePickerState) {
      case 0:
        newState = processMonth(parseInt(dateProps.month) + 1, dateProps);
        break;
      case 1:
        newState = processYear(
          parseInt(dateProps.year) + 1,
          yearProps,
          dateProps
        );
        break;
      case 2:
        newState = processTenYear(
          parseInt(yearProps.start.slice(0, 3)) + 1,
          yearProps
        );
        break;
    }

    setState({
      ...state,
      ...newState,
    });
  };

  const yearBtnClick = () => {
    const displayStatus = processDisplayStatus(datePickerState + 1);

    setState({
      ...state,
      ...displayStatus,
    });
  };

  const onSelectDate = (date) => {
    const { year, month } = state.dateProps;
    const datePropsSelect = [
      year,
      numToTwoDigitStr(parseInt(month) + 1),
      numToTwoDigitStr(date),
    ].join("-");

    setState({
      ...state,
      closeSelf: true,
      dateProps: {
        year: year,
        month: month,
        select: datePropsSelect,
      },
      monthProps: {
        select: month,
      },
      yearProps: {
        ...state.yearProps,
        select: year,
      },
    });
  };

  const onSelectMonth = (month) => {
    const displayStatus = processDisplayStatus(datePickerState - 1);

    setState({
      ...state,
      ...displayStatus,
      dateProps: {
        ...state.dateProps,
        month: month.toString(),
      },
    });
  };

  const onSelectYear = (year) => {
    const displayStatus = processDisplayStatus(datePickerState - 1);
    const displayYear = processYear(parseInt(year), yearProps, dateProps);

    setState({
      ...state,
      ...displayStatus,
      ...displayYear,
      dateProps: {
        ...state.dateProps,
        year: year.toString(),
      },
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
};

DatePicker.propTypes = {
  selectDate: PropTypes.string,
  onSelect: PropTypes.func,
};

DatePicker.defaultProps = {
  selectDate: new Date().toISOString().slice(0, 10),
};

export default DatePicker;
