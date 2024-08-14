import React, { PureComponent, createContext } from "react";
import PropTypes from "prop-types";
import Modal from "../modal/components/Modal";
import Navigation from "../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import { getEventsListsFromDB } from "../../gateway/getEway";

import "./calendar.scss";

export const MyContext = createContext();

class Calendar extends PureComponent {
  state = {
    events: [],
    eventToEdit: null,
  };

  componentDidMount() {
    this.updateTasks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen && !this.props.isOpen) {
      this.setState({
        eventToEdit: null,
      });
    }
  }

  updateTasks = () => {
    getEventsListsFromDB()
      .then((list) => {
        this.setState({
          events: [...list],
          eventToEdit: null,
        });
      })
      .catch((err) => console.error("Error loading events:", err));
  };

  onEventToChange = (event) => {
    this.setState({
      eventToEdit: event,
    });
    this.props.handleOpen();
  };

  render() {
    const { weekDates, isOpen, handleClose } = this.props;
    return (
      <MyContext.Provider
        value={{
          updateTasks: this.updateTasks,
          onEventToChange: this.onEventToChange,
        }}
      >
        <section className="calendar">
          <Navigation weekDates={weekDates} />
          <div className="calendar__body">
            <div className="calendar__week-container">
              <Sidebar />
              <Week weekDates={weekDates} events={this.state.events} />
            </div>
          </div>
          {isOpen && (
            <Modal
              handleClose={handleClose}
              updateTasks={this.updateTasks}
              event={this.state.eventToEdit}
            />
          )}
        </section>
      </MyContext.Provider>
    );
  }
}

Calendar.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.object).isRequired,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

Calendar.defaultProps = {
  isOpen: false,
};

export default Calendar;
