import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/components/Modal';
import Event from '../event/components/Event.jsx';
import { MyContext } from '../calendar/Calendar';
import { formatMins } from '../../../src/utils/dateUtils.js';

import './hour.scss';

const Hour = ({ dataHour, hourEvents }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const { updateTasks } = useContext(MyContext);

  const onDoubleClick = ({ id, eventStart, eventEnd, title, description, dateFrom }) => {
    setEventToEdit({
      id,
      startTime: eventStart,
      endTime: eventEnd,
      date: dateFrom.toISOString().slice(0, 10),
      title,
      description 
    })
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {hourEvents.map(({ id, dateFrom, dateTo, title, description }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(
          dateFrom.getMinutes()
        )}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(
          dateTo.getMinutes()
        )}`;

        return (
          <Event
            key={id}
            id={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            description={description}
            onDoubleClick={() => onDoubleClick({ id, eventStart, eventEnd, title, description, dateFrom })}
            updateTasks={updateTasks}
            dateTo={dateTo}
          />
        );
      })}
      {isModalOpen && <Modal handleClose={handleCloseModal} updateTasks={updateTasks} event={eventToEdit} />}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Hour;

