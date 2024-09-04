import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Day from "../day/Day";

import "./week.scss";

const Week = ({ weekDates, events }) => (
  <div className="calendar__week">
    {weekDates.map((dayStart) => {
      const dayEnd = new Date(dayStart).setHours(23, 59, 59, 999);

      const dayEvents = events.filter(
        ({ dateFrom, dateTo }) =>
          dateFrom.getTime() >= dayStart.getTime() &&
          dateTo.getTime() <= dayEnd,
      );

      const isToday = moment().isSame(dayStart, "day");

      return (
        <Day
          key={dayStart.getDate()}
          dataDay={dayStart.getDate()}
          dayEvents={dayEvents}
          isToday={isToday}
        />
      );
    })}
  </div>
);

Week.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.object).isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Week;
