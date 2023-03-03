import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Main from "../main/Main.jsx";
import Navigation from "../navigation/Navigation.jsx";
import { getEvents } from "../../gateway/events.js";

import "./calendar.scss";

const Calendar = ({
  weekDates,
  hideModal,
  openModal,
  dataSelectedDate,
  isModalOpen,
  setDataSelectedDate,
}) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((allEvents) => setEvents(allEvents));
  }, []);

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <Main
        events={events}
        weekDates={weekDates}
        isModalOpen={isModalOpen}
        dataSelectedDate={dataSelectedDate}
        setDataSelectedDate={setDataSelectedDate}
        hideModal={hideModal}
        openModal={openModal}
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
};

export default Calendar;
