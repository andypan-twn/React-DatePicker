"use strict";
import React from "react";
import styles from "./week.module.scss";
import { weekStr } from "../utils/weekStr";

const WeekComponent = () => {
  return (
    <div className={styles.week}>
      {weekStr.map((text, idx) => (
        <span key={idx}>{text}</span>
      ))}
    </div>
  );
};

export default WeekComponent;
