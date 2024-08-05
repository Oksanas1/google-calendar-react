import React from 'react';
import PropTypes from 'prop-types';
import Hour from '../hour/Hour';
import TimeScale from '../timescale/TimeScale';

import './day.scss';

const Day = ({ dataDay, dayEvents, isToday }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);
  
  return (
    <div className="calendar__day" data-day={dataDay}>
      {isToday && <TimeScale />}
      {hours.map((hour) => {
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour key={dataDay + hour} dataHour={hour} hourEvents={hourEvents} />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  isToday: PropTypes.bool.isRequired,
}

export default Day;
