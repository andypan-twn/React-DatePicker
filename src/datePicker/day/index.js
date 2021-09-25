"use strict";
import React from "react";
import styles from "./index.module.scss";
import Week from "./week";

class Day extends React.Component {
  render() {
    return (
      <>
        <Week></Week>
        <ul className={styles.day}>
          <li className={styles.disable}>1</li>
          <li>2</li>
          <li>3</li>
          <li className={styles.today}>4</li>
          <li className={styles.select}>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
        </ul>
      </>
    );
  }
}

export default Day;
