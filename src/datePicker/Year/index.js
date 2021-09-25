"use strict";
import React from "react";
import styles from "./index.module.scss";

class Year extends React.Component {
  render() {
    return (
      <ul className={styles.year}>
        <li className={styles.disable}>2009</li>
        <li>2010</li>
        <li>2011</li>
        <li>2012</li>
        <li className={styles.select}>2013</li>
        <li>2014</li>
        <li>2015</li>
        <li>2016</li>
        <li>2017</li>
        <li>2018</li>
        <li>2019</li>
        <li className={styles.disable}>2020</li>
      </ul>
    );
  }
}

export default Year;
