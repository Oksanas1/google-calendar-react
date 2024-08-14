import React, { Component } from "react";
import moment from "moment";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import {
  getWeekStartDate,
  generateWeekRange,
  getDisplayedMonth,
} from "./utils/dateUtils.js";

import "./common.scss";

class App extends Component {
  state = {
    weekStartDate: getWeekStartDate(new Date()),
    isOpen: false,
  };

  handleNextWeek = () => {
    this.setState({
      weekStartDate: moment(this.state.weekStartDate).add(7, "days").format(),
    });
  };

  handlePrevWeek = () => {
    this.setState({
      weekStartDate: moment(this.state.weekStartDate)
        .subtract(7, "days")
        .format(),
    });
  };

  handleCurrentWeek = () => {
    this.setState({
      weekStartDate: getWeekStartDate(new Date()),
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  render() {
    const { weekStartDate, isOpen } = this.state;
    const weekDates = generateWeekRange(weekStartDate);
    const currentMonth = getDisplayedMonth(weekDates[0], weekDates[6]);
    return (
      <>
        <Header
          handleOpen={this.handleOpen}
          handleCurrentWeek={this.handleCurrentWeek}
          handlePrevWeek={this.handlePrevWeek}
          handleNextWeek={this.handleNextWeek}
          currentMonth={currentMonth}
        />
        <Calendar
          weekDates={weekDates}
          handleClose={this.handleClose}
          handleOpen={this.handleOpen}
          isOpen={isOpen}
        />
      </>
    );
  }
}

export default App;
