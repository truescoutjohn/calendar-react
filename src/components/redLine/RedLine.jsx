import React from 'react';
import './redline.scss';

const RedLine = ({ minutes }) => (
  <div
    className="calendar__redline"
    style={{
      top: minutes,
    }}
  ></div>
);

export default RedLine;
