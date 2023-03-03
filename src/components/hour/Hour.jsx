import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Event from '../event/Event.jsx';
import RedLine from '../redLine/RedLine.jsx';
import { formatMins, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE } from '../../utils/dateUtils.js';
import './hour.scss';

const Hour = ({ dataDate, dataCurrentDate, hourEvents, onEventDelete }) => {
  const [currentDate, setCurrentDate] = useState(dataCurrentDate);
  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      setCurrentDate(new Date(dataCurrentDate.getTime() + MILLISECONDS_IN_MINUTE));
    }, MILLISECONDS_IN_MINUTE);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const minutes = currentDate.getTime() % MILLISECONDS_IN_HOUR;
  return (
    <div
      className="calendar__time-slot"
      data-time={dataDate.getHours() + 1}
      data-date={dataDate.toString()}
    >
      {dataDate.getTime() === new Date(currentDate - minutes).getTime() && (
        <RedLine minutes={currentDate.getMinutes()} />
      )}
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;

        return (
          <Event
            key={id}
            id={id}
            height={Math.abs(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            onEventDelete={onEventDelete}
            dataDate={dataDate}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  dataCurrentDate: PropTypes.object.isRequired,
  hourEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      dateFrom: PropTypes.object,
      dateTo: PropTypes.object,
      title: PropTypes.string,
    }),
  ).isRequired,
  onEventDelete: PropTypes.func.isRequired,
};

export default Hour;
