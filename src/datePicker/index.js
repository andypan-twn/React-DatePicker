"use strict";
import React from "react";
import "./index.scss";

class DatePicker extends React.Component {
  render() {
    return (
      <section id="date-picker">
        <div class="header">
          <div class="btn">&lt;</div>
          <div class="info">Sep 2021</div>
          <div class="btn">&gt;</div>
        </div>
        <div class="week">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>
        <ul class="col-7">
          <li class="disable">1</li>
          <li>2</li>
          <li>3</li>
          <li class="today">4</li>
          <li class="select">5</li>
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
        <ul class="col-4">
          <li class="disable">1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li class="select">5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
        </ul>
      </section>
    );
  }
}

export default DatePicker;
