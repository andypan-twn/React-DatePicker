"use strict";
import React from "react";
import PropTypes from "prop-types";
import styles from "./year.module.scss";

const YearComponent = ({ onSelect, ...props }) => {
  const yearList = () => {
    const start = parseInt(props.start);
    const end = parseInt(props.end);
    const select = parseInt(props.select);
    let result = [];

    const preYear = start - 1;
    result.push({
      id: preYear,
      disable: true,
      className: styles.disable,
      text: preYear,
    });

    let current = start;
    while (current <= end) {
      let className = "";
      if (current === select) {
        className = styles.select;
      }

      result.push({
        id: current,
        disable: false,
        className: className,
        text: current,
      });
      current++;
    }

    const nextYear = end + 1;
    result.push({
      id: nextYear,
      disable: true,
      className: styles.disable,
      text: nextYear,
    });

    return result;
  };

  return (
    <ul className={styles.year}>
      {yearList().map((year) => (
        <li
          key={year.id}
          className={year.className}
          onClick={() => year.disable || onSelect(year.text)}
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
  onSelect: () => {},
};

export default YearComponent;
