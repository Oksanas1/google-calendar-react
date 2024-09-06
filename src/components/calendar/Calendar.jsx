import React, { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../modal/components/Modal";
import Navigation from "../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import { getEventsListsFromDB } from "../../gateway/index";
import { generateWeekRange } from "../../utils/dateUtils.js";

import "./calendar.scss";

export const MyContext = createContext();

const Calendar = ({
  weekStartDate,
  handleOpenModal,
  handleCloseModal,
  isOpenModal,
}) => {
  const [events, setEvents] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null);
  const weekDates = generateWeekRange(weekStartDate);

  useEffect(() => {
    if (!isOpenModal) {
      setEventToEdit(null);
    }
  }, [isOpenModal]);

  const updateTasks = () => {
    getEventsListsFromDB()
      .then((list) => {
        setEvents([...list]);
        setEventToEdit(null);
      })
      .catch((err) => console.error("Error loading events:", err));
  };

  useEffect(() => {
    updateTasks();
  }, []);

  const onEventToChange = (event) => {
    setEventToEdit(event);
    handleOpenModal();
  };

  return (
    <MyContext.Provider
      value={{
        updateTasks,
        onEventToChange,
      }}
    >
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week weekDates={weekDates} events={events} />
          </div>
        </div>
        {isOpenModal && (
          <Modal
            handleCloseModal={handleCloseModal}
            updateTasks={updateTasks}
            eventToEdit={eventToEdit}
            events={events}
          />
        )}
      </section>
    </MyContext.Provider>
  );
};

Calendar.propTypes = {
  isOpenModal: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  weekStartDate: PropTypes.object.isRequired,
};

export default Calendar;
