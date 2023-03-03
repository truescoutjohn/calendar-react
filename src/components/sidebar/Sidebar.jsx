import React from 'react';
import { HOURS_IN_DAY } from '../../utils/dateUtils';

import './sidebar.scss';

const Sidebar = props => {
  const hours = Array(HOURS_IN_DAY)
    .fill()
    .map((_, index) => index);

  return (
    <div className="calendar__time-scale">
      {hours.map(hour => (
        <div key={hour} className="time-slot">
          <span className="time-slot__time">{`${hour}:00`}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
