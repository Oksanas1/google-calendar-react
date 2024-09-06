import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { updateListInDB } from "../modal.actions";
import { validateEvent } from "../modal.validation";
import { createNewFormData } from "../modal.utils";

import "./modal.scss";

const Modal = ({ events, updateTasks, handleCloseModal, eventToEdit }) => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    startTime: "",
    endTime: "",
    description: "",
    date: "",
    color: "",
  });

  useEffect(() => {
    if (eventToEdit) {
      setNewEvent(createNewFormData(eventToEdit));
    }
  }, []);

  const handleChangeDataForm = (target) => {
    const { name, value } = target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (validateEvent(newEvent, events)) {
      try {
        await updateListInDB(newEvent);

        updateTasks();
        handleCloseModal();
      } catch (error) {
        console.error("Error updating list in DB:", error);
      }
    }
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            className="create-event__close-btn"
            onClick={handleCloseModal}
          >
            +
          </button>
          <form className="event-form" onSubmit={handleSubmitForm}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              required
              value={newEvent.title}
              onChange={(e) => handleChangeDataForm(e.target)}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={newEvent.date}
                onChange={(e) => handleChangeDataForm(e.target)}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={(e) => handleChangeDataForm(e.target)}
                value={newEvent.startTime}
                step="900"
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                onChange={(e) => handleChangeDataForm(e.target)}
                value={newEvent.endTime}
                step="900"
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={newEvent.description}
              onChange={(e) => handleChangeDataForm(e.target)}
            ></textarea>
            <input
              type="color"
              name="color"
              value={newEvent.color}
              onChange={(e) => handleChangeDataForm(e.target)}
            />
            <button type="submit" className="event-form__submit-btn">
              {eventToEdit ? "Edit" : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  updateTasks: PropTypes.func.isRequired,
  event: PropTypes.object,
};

export default Modal;
