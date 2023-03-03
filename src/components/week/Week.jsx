import React from 'react';
import PropTypes from 'prop-types';
import Day from '../day/Day.jsx';
import './week.scss';

const Week = ({ weekDates, events, dataCurrentDate, onEventDelete, clickHandler }) => (
  <div className="calendar__week" onClick={clickHandler}>
    {weekDates.map(dayStart => {
      const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

      const dayEvents = events.filter(event => event.dateFrom >= dayStart && event.dateTo < dayEnd);

      return (
        <Day
          key={dayStart}
          dataDate={dayStart}
          dayEvents={dayEvents}
          dataCurrentDate={dataCurrentDate}
          onEventDelete={onEventDelete}
        />
      );
    })}
  </div>
);

Week.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.object).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      dateFrom: PropTypes.object,
      dateTo: PropTypes.object,
      title: PropTypes.string,
    }),
  ).isRequired,
  onEventDelete: PropTypes.func.isRequired,
};

export default Week;
