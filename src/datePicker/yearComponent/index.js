"use strict";
import React from "react";
import PropTypes from "prop-types";
import styles from "./year.module.scss";

class YearComponent extends React.Component {
  render() {
    const { start, end, select } = this.props;

    const yearList = () => {
      let result = [];

      let preYear = start - 1;
      let preYearClassName = [styles.disable];
      if (preYear == select) {
        preYearClassName.push(styles.select);
      }
      result.push({
        id: preYear,
        className: preYearClassName,
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
          className: className,
          text: current,
        });
        current++;
      }

      let nextYear = end + 1;
      let nextYearClassName = [styles.disable];
      if (preYear == select) {
        nextYearClassName.push(styles.select);
      }
      result.push({
        id: nextYear,
        className: nextYearClassName,
        text: nextYear,
      });

      return result;
    };

    return (
      <ul className={styles.year}>
        {yearList().map((year) => (
          <li key={year.id} className={year.className.join(" ")}>
            {year.text}
          </li>
        ))}
      </ul>
    );
  }
}

YearComponent.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  select: PropTypes.string,
};
YearComponent.defaultProps = {
  start: "2020",
  end: "2029",
  select: "2021",
};

export default YearComponent;
