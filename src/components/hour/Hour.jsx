import React, { useContext, useCallback } from "react";
import PropTypes from "prop-types";
import Event from "../event/Event.jsx";
import { MyContext } from "../calendar/Calendar";
import { formatToEventTimeForForm } from "../../utils/dateUtils.js";

import "./hour.scss";

const HEIGHT_BLOCK = 60000;

const Hour = ({ dataHour, hourEvents }) => {
  const { updateTasks, onEventToChange } = useContext(MyContext);

  const onDoubleClick = useCallback((event) => {
    onEventToChange(event);
  }, []);

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {hourEvents.map((event) => {
        const { id, dateFrom, dateTo, title, description, color } = event;
        const startTime = formatToEventTimeForForm(dateFrom);
        const endTime = formatToEventTimeForForm(dateTo);

        return (
          <Event
            key={id}
            id={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / HEIGHT_BLOCK}
            marginTop={dateFrom.getMinutes()}
            time={`${startTime} - ${endTime}`}
            title={title}
            description={description}
            color={color}
            onDoubleClick={() =>
              onDoubleClick({ ...event, startTime, endTime })
            }
            updateTasks={updateTasks}
            dateTo={dateTo}
          />
        );
      })}
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
