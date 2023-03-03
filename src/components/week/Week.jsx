import React from "react";
import PropTypes from "prop-types";
import Day from "../day/Day.jsx";
import "./week.scss";

const Week = ({
  weekDates,
  events,
  onEventDelete,
  setDataSelectedDate,
  openModal,
}) => {
  const clickHandler = (event) => {
    if (!event.target.classList.contains("calendar__time-slot")) {
      return null;
    }
    const selectedDate = event.target.dataset.date;
    if (!Number.isNaN(Date.parse(selectedDate))) {
      setDataSelectedDate(new Date(selectedDate));
      openModal();
    } else {
      alert("Incorrect date");
    }
    return null;
  };
  return (
    <div className="calendar__week" onClick={clickHandler}>
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        const dayEvents = events.filter(
          (event) => event.dateFrom >= dayStart && event.dateTo < dayEnd
        );

        return (
          <Day
            key={dayStart}
            dataDate={dayStart}
            dayEvents={dayEvents}
            onEventDelete={onEventDelete}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.object).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      dateFrom: PropTypes.object,
      dateTo: PropTypes.object,
      title: PropTypes.string,
    })
  ).isRequired,
  onEventDelete: PropTypes.func.isRequired,
};

export default Week;
