import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({ handleOpen, handleCurrentWeek, handlePrevWeek, handleNextWeek, currentMonth }) => {
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={handleOpen}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={handleCurrentWeek}>Today</button>
        <button className="icon-button navigation__nav-icon" onClick={handlePrevWeek}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={handleNextWeek}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{currentMonth}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  handleCurrentWeek: PropTypes.func.isRequired,
  handlePrevWeek: PropTypes.func.isRequired,
  handleNextWeek: PropTypes.func.isRequired,
  currentMonth: PropTypes.string.isRequired
};

export default Header;
