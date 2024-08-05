import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Popup from '../../popup/Popup';
import calculatePosition from '../event.calculatePosition';
import { deletEventInDB } from '../../../gateway/getEway';

import './event.scss';

const Event = ({ id, height, marginTop, title, time, description, onDoubleClick, updateTasks, dateTo }) => {
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const eventRef = useRef(null);
  const clickTimer = useRef(null);
  const currentTime = new Date();
  let timeDiff = dateTo.getTime() - currentTime.getTime();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (eventRef.current && !eventRef.current.contains(e.target)) {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
    };
  }, [isPopupOpen]);

  const handleClick = (e) => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }

    clickTimer.current = setTimeout(() => {
      if (!isPopupOpen) {
        setIsPopupOpen(true);
        const { top, left } = calculatePosition(e, eventRef);
        setCoordinates({ top, left });
      }
    }, 300);
  };

  const handleDoubleClick = () => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }
    if (timeDiff > 600) {
        setIsPopupOpen(false);
        onDoubleClick();
    } else {
      alert('Event cannot be eddit within 15 minutes of its end time.');
    }
  };

  const handleDelete = () => {
    if (timeDiff > 600) {
      deletEventInDB(id).then(() => {
        updateTasks();
        setIsPopupOpen(false);
      });
    } else {
      alert('Event cannot be deleted within 15 minutes of its end time.');
    }
  };

  const eventStyle = useMemo(() => ({
    height,
    marginTop,
  }), [height, marginTop]);

  return (
    <>
      <div ref={eventRef} style={eventStyle} className="event" onClick={handleClick} onDoubleClick={handleDoubleClick}>
        <h4 className="event__title">{title}</h4>
        <p className="event__time">{time}</p>
        <p className="event__description">{description}</p>
        {isPopupOpen && <Popup style={coordinates} handleDelete={handleDelete} />}
      </div>
      </>

  );
};

Event.propTypes = {
  id: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string,
  onDoubleClick: PropTypes.func.isRequired,
  updateTasks: PropTypes.func.isRequired,
  dateTo: PropTypes.instanceOf(Date).isRequired,
}

Event.defaultTypes = {
  description: '',
}

export default Event;
