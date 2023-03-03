import React, { useState, useEffect } from 'react';
import './popup-errors.scss';

const MAX_WIDTH_HTML_ELEMENT = 100;
const PopupErrors = ({ errorText, width, setWidth, setIsError }) => {
  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      setWidth(prevState => {
        if (prevState < MAX_WIDTH_HTML_ELEMENT) {
          return prevState + 1;
        }
        setIsError(false);
        return 0;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="popup__wrapper">
      <span className="popup__text">{errorText}</span>
      <div className="popup__progress" style={{ width: `${width}%` }}></div>
    </div>
  );
};

export default PopupErrors;
