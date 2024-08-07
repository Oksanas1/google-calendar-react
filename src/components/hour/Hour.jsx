import React, { useState, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import Modal from "../modal/components/Modal";
import Event from "../event/components/Event.jsx";
import { MyContext } from "../calendar/Calendar";
import { formatToEventTimeForForm } from "../../utils/dateUtils.js";

import "./hour.scss";

const Hour = ({ dataHour, hourEvents }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const { updateTasks } = useContext(MyContext);

  const onDoubleClick = useCallback((event) => {
    setEventToEdit({
      ...event,
      startTime: event.eventStart,
      endTime: event.eventEnd,
      date: event.dateFrom.toLocaleDateString().split("/").reverse().join("-"),
    });
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {hourEvents.map((event) => {
        const { id, dateFrom, dateTo, title, description, color } = event;
        const eventStart = formatToEventTimeForForm(dateFrom);
        const eventEnd = formatToEventTimeForForm(dateTo);

        return (
          <Event
            key={id}
            id={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            description={description}
            color={color}
            onDoubleClick={() =>
              onDoubleClick({ ...event, eventStart, eventEnd })
            }
            updateTasks={updateTasks}
            dateTo={dateTo}
          />
        );
      })}
      {isModalOpen && (
        <Modal
          handleClose={handleCloseModal}
          updateTasks={updateTasks}
          event={eventToEdit}
        />
      )}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      dateFrom: PropTypes.instanceOf(Date).isRequired,
      dateTo: PropTypes.instanceOf(Date).isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      color: PropTypes.string,
    }),
  ).isRequired,
};

export default Hour;
