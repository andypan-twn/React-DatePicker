"use strict";
import React from "react";
import PropTypes from "prop-types";
import styles from "./year.module.scss";

class YearComponent extends React.Component {
  render() {
    const { start, end, select } = this.props;

    const yearList = () => {
      let result = [];

      let preYear = parseInt(start) - 1;
      result.push({
        id: preYear,
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
          className: className,
          text: current,
        });
        current++;
      }

      let nextYear = parseInt(end) + 1;
      result.push({
        id: nextYear,
        className: [styles.disable],
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
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  select: PropTypes.string,
};

YearComponent.defaultProps = {
  select: "",
};

export default YearComponent;
