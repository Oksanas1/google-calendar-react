import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Day from '../day/Day';

import './week.scss';

const Week = ({ weekDates, events }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < new Date(dayEnd)
        );

        const isToday = moment().isSame(dayStart, 'day');

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
};

Week.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.object).isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Week;
