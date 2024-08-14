import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import Popup from "../../popup/Popup";
import calculatePosition from "../event.calculatePosition";
import { deleteEventInDB } from "../../../gateway/getEway";

import "./event.scss";

const Event = ({
  id,
  height,
  marginTop,
  title,
  time,
  description,
  color,
  onDoubleClick,
  updateTasks,
  dateTo,
}) => {
  const [coordinates, setCoordinates] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const eventRef = useRef(null);
  const clickTimer = useRef(null);
  const timeDiff = useMemo(
    () => dateTo.getTime() - new Date().getTime(),
    [dateTo],
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (eventRef.current && !eventRef.current.contains(e.target)) {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
    };
  }, [isPopupOpen]);

  const handleClick = useCallback(
    (e) => {
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }

      clickTimer.current = setTimeout(() => {
        if (!isPopupOpen) {
          setIsPopupOpen(true);
          const position = calculatePosition(e, eventRef);
          setCoordinates(position);
        }
      }, 300);
    },
    [isPopupOpen],
  );

  const handleDoubleClick = useCallback(() => {
    setIsPopupOpen(false);
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }
    if (timeDiff < 900000) {
      alert("Event cannot be eddit within 15 minutes of its end time.");
      return;
    }
    onDoubleClick();
  }, [onDoubleClick, timeDiff]);

  const handleDelete = useCallback(async () => {
    if (timeDiff < 900000) {
      alert("Event cannot be deleted within 15 minutes of its end time.");
      setIsPopupOpen(false);
      return;
    }

    try {
      await deleteEventInDB(id);
      updateTasks();
      setIsPopupOpen(false);
    } catch (error) {
      alert("Error deleting event. Please try again.");
    }
  }, [id, timeDiff, updateTasks]);

  const eventStyle = useMemo(
    () => ({
      height,
      marginTop,
      background: color,
    }),
    [height, marginTop, color],
  );

  return (
    <div className="event_wrap" style={eventStyle} ref={eventRef}>
      <div
        className="event"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        style={{ background: color }}
      >
        <div className="event__header">
          <h4 className="event__title">{title}</h4>
          <p className="event__time">{time}</p>
        </div>
        <p className="event__description">{description}</p>
      </div>
      {isPopupOpen && <Popup style={coordinates} handleDelete={handleDelete} />}
    </div>
  );
};

Event.propTypes = {
  id: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string,
  color: PropTypes.string,
  onDoubleClick: PropTypes.func.isRequired,
  updateTasks: PropTypes.func.isRequired,
  dateTo: PropTypes.instanceOf(Date).isRequired,
};

export default Event;
