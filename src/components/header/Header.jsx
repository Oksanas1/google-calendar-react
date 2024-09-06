import React, { memo, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { getWeekStartDate, getDisplayedMonth } from "../../utils/dateUtils.js";

import "./header.scss";

const Header = ({ handleOpenModal, setWeekStartDate, weekStartDate }) => {
  const [currentMonth, setCurrentMonth] = useState(
    getDisplayedMonth(
      weekStartDate,
      new Date(moment(weekStartDate).add(6, "days").format()),
    ),
  );

  const handleNextWeek = () => {
    const newWeekStartDate = new Date(
      moment(weekStartDate).add(7, "days").format(),
    );
    setWeekStartDate(newWeekStartDate);
  };

  const handlePrevWeek = () => {
    const newWeekStartDate = new Date(
      moment(weekStartDate).subtract(7, "days").format(),
    );
    setWeekStartDate(newWeekStartDate);
    setCurrentMonth(
      getDisplayedMonth(
        weekStartDate,
        new Date(moment(weekStartDate).add(6, "days").format()),
      ),
    );
  };

  const handleCurrentWeek = () => {
    setWeekStartDate(getWeekStartDate(new Date()));
  };

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={handleOpenModal}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={handleCurrentWeek}
        >
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={handlePrevWeek}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={handleNextWeek}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{currentMonth}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
  setWeekStartDate: PropTypes.func.isRequired,
  weekStartDate: PropTypes.object.isRequired,
};

export default memo(Header);
