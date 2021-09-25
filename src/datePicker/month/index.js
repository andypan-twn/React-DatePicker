"use strict";
import React from "react";
import styles from "./index.module.scss";

class Month extends React.Component {
  render() {
    return (
      <ul className={styles.month}>
        <li className={styles.disable}>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li className={styles.select}>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
      </ul>
    );
  }
}

export default Month;
