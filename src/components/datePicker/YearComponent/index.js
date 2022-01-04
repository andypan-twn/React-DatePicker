"use strict";
import React from "react";
import PropTypes from "prop-types";
import styles from "./year.module.scss";

const yearList = (start, end, select) => {
  let result = [];

  let preYear = parseInt(start) - 1;
  result.push({
    id: preYear,
    disable: true,
    className: [styles.disable],
    text: preYear,
  });

  let current = start;
  while (current <= end) {
    let className = [];
    if (current == select) {
      className = [styles.select];
    }

    result.push({
      id: current,
      disable: false,
      className: className,
      text: current,
    });
    current++;
  }

  let nextYear = parseInt(end) + 1;
  result.push({
    id: nextYear,
    disable: true,
    className: [styles.disable],
    text: nextYear,
  });

  return result;
};

const YearComponent = ({ start, end, select, onSelect }) => {
  const handleClick = (data) => {
    if (data.disable) {
      return;
    }
    onSelect(data.text);
  };

  return (
    <ul className={styles.year}>
      {yearList(start, end, select).map((year) => (
        <li
          key={year.id}
          className={year.className.join(" ")}
          onClick={() => handleClick(year)}
        >
          {year.text}
        </li>
      ))}
    </ul>
  );
};

YearComponent.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  select: PropTypes.string,
  onSelect: PropTypes.func,
};

YearComponent.defaultProps = {
  select: "",
};

export default YearComponent;
