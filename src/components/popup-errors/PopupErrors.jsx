import React, { useEffect } from "react";
import "./popup-errors.scss";

const MAX_WIDTH_ERROR_ELEMENT = 100;
const PopupErrors = ({ errorText, width, setWidth, setIsError }) => {
  let timeout;
  useEffect(() => {
    timeout = setTimeout(() => {
      setWidth((prevState) => {
        if (prevState < MAX_WIDTH_ERROR_ELEMENT) {
          return prevState + 1;
        }
        setIsError(false);
        return 0;
      });
    }, 20);

    return () => clearTimeout(timeout);
  });

  return (
    <div className="popup__wrapper">
      <span className="popup__text">{errorText}</span>
      <div className="popup__progress" style={{ width: `${width}%` }}></div>
    </div>
  );
};

export default PopupErrors;
