import React, { Component } from "react";
import PropTypes from "prop-types";
import { updateListInDB } from "../modal.actions";
import validateEvent from "../modal.validation";
import { createNewFormData } from "../modal.utils";

import "./modal.scss";

class Modal extends Component {
  state = {
    title: "",
    startTime: "",
    endTime: "",
    description: "",
    date: "",
    color: "",
  };

  componentDidMount() {
    this.setState(createNewFormData(this.props.event));
  }

  handleChange = (target) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (validateEvent(this.state, [])) {
      const { updateTasks, handleClose } = this.props;
      try {
        await updateListInDB(this.state);

        updateTasks();
        handleClose();
      } catch (error) {
        console.error("Error updating list in DB:", error);
      }
    }
  };

  render() {
    const { handleClose, event } = this.props;
    const { title, date, startTime, endTime, description, color } = this.state;

    return (
      <div className="modal overlay">
        <div className="modal__content">
          <div className="create-event">
            <button className="create-event__close-btn" onClick={handleClose}>
              +
            </button>
            <form className="event-form" onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="event-form__field"
                required
                value={title}
                onChange={(e) => this.handleChange(e.target)}
              />
              <div className="event-form__time">
                <input
                  type="date"
                  name="date"
                  className="event-form__field"
                  value={date}
                  onChange={(e) => this.handleChange(e.target)}
                />
                <input
                  type="time"
                  name="startTime"
                  className="event-form__field"
                  onChange={(e) => this.handleChange(e.target)}
                  value={startTime}
                  step="900"
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  className="event-form__field"
                  onChange={(e) => this.handleChange(e.target)}
                  value={endTime}
                  step="900"
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                className="event-form__field"
                value={description}
                onChange={(e) => this.handleChange(e.target)}
              ></textarea>
              <input
                type="color"
                name="color"
                value={color}
                onChange={(e) => this.handleChange(e.target)}
              />
              <button type="submit" className="event-form__submit-btn">
                {event ? "Edit" : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  updateTasks: PropTypes.func.isRequired,
  event: PropTypes.object,
};

Modal.defaultProps = {
  event: null,
};

export default Modal;
