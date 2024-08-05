import React, { PureComponent, createContext } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/components/Modal';
import Navigation from '../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import { getEventsListsFromDB } from '../../gateway/getEway';

import './calendar.scss';

export const MyContext = createContext();

class Calendar extends PureComponent {
  state = {
    events: [],
  };

  componentDidMount() {
    getEventsListsFromDB()
      .then(list => {
        this.setState({
          events: [...list],
        })
      })
      .catch(err => console.error(err))
  }

  updateTasks = () => {
    getEventsListsFromDB()
      .then(list => {
        this.setState({
          events: [...list],
        })
      })
      .catch(err => console.error(err))
  }

  render() {
    const { weekDates, isOpen, handleClose } = this.props;
    return (
      <MyContext.Provider value={{updateTasks: this.updateTasks}}>
        <section className="calendar">
          <Navigation weekDates={weekDates} />
          <div className="calendar__body">
            <div className="calendar__week-container">
              <Sidebar />
              <Week weekDates={weekDates} events={this.state.events} />
            </div>
          </div>
          {isOpen && <Modal handleClose={handleClose} updateTasks={this.updateTasks} />}
        </section>
      </MyContext.Provider>
    );
  }
}

Calendar.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.object).isRequired,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
}

Calendar.defaultProps = {
  isOpen: false,
};

export default Calendar;
