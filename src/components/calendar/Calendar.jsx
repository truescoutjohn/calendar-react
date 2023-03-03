import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Main from '../main/Main.jsx';
import Navigation from '../navigation/Navigation.jsx';
import { getEvents } from '../../gateway/events.js';

import './calendar.scss';

const Calendar = ({
  weekDates,
  hideModal,
  openModal,
  dataSelectedDate,
  setDataSelectedDate,
  isModalOpen,
  dataCurrentDate,
}) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(allEvents => setEvents(allEvents));
  }, []);

  const clickHandler = event => {
    if (!event.target.classList.contains('calendar__time-slot')) {
      return null;
    }
    const selectedDate = event.target.dataset.date;
    if (!Number.isNaN(Date.parse(selectedDate))) {
      setDataSelectedDate(new Date(selectedDate));
      openModal();
    } else {
      alert('Incorrect date');
    }
    return null;
  };

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <Main
        events={events}
        dataCurrentDate={dataCurrentDate}
        weekDates={weekDates}
        isModalOpen={isModalOpen}
        clickHandler={clickHandler}
        dataSelectedDate={dataSelectedDate}
        hideModal={hideModal}
        setEvents={setEvents}
      />
    </section>
  );
};

Calendar.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.object),
  hideModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  startDateWeek: PropTypes.object.isRequired,
  dataCurrentDate: PropTypes.object.isRequired,
};

export default Calendar;
