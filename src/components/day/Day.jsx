import React from 'react';
import PropTypes from 'prop-types';
import Hour from '../hour/Hour.jsx';
import './day.scss';
import { HOURS_IN_DAY, MILLISECONDS_IN_HOUR } from '../../utils/dateUtils';

const Day = ({ dataDate, dayEvents, dataCurrentDate, onEventDelete }) => {
  const hours = Array(HOURS_IN_DAY)
    .fill(null)
    .map((_, index) => index);

  return (
    <div className="calendar__day" data-day={dataDate.getDate()}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => event.dateFrom.getHours() === hour);

        const copyDate = new Date(dataDate.getTime() + hour * MILLISECONDS_IN_HOUR);

        return (
          <Hour
            key={dataDate.getDate() + hour}
            dataDate={copyDate}
            dataCurrentDate={dataCurrentDate}
            dataHour={hour}
            hourEvents={hourEvents}
            onEventDelete={onEventDelete}
          />
        );
      })}
    </div>
  );
};
Day.propTypes = {
  dataCurrentDate: PropTypes.object.isRequired,
  dayEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      dateFrom: PropTypes.object,
      dateTo: PropTypes.object,
      title: PropTypes.string,
    }),
  ).isRequired,
  onEventDelete: PropTypes.func.isRequired,
};
export default Day;
