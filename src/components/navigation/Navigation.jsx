import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { days } from '../../utils/dateUtils.js';

import './navigation.scss';

const Navigation = ({ weekDates }) => {
  const today = new Date();

  const dayClass = (dayDate, nameClass) => {
    const isBefore = moment(dayDate).isBefore(today, 'day');
    const isToday = moment(today).isSame(dayDate, 'day');
    if(nameClass === 'number') {
      return classNames(`day-label__day-number`, {
        'day-label__day-number_today-color': isToday,
        'day-label__day-number_prev-day-color': isBefore,
      });
    }

    return classNames(`day-label__day-name`, {
      'day-label__day-name_today-color': isToday,
      'day-label__day-name_prev-day-color': isBefore,
    });
  };

  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => (
        <div key={dayDate} className="calendar__day-label day-label">
          <span className={dayClass(dayDate, 'name')}>{days[dayDate.getDay()]}</span>
          <span className={dayClass(dayDate, 'number')}>{dayDate.getDate()}</span>
        </div>
      ))}
    </header>
  );
};

Navigation.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default memo(Navigation);
