import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({ resetDate, getNextWeek, getPrevWeek, month, onOpenModal }) => (
  <header className="header">
    <button className="button create-event-btn" onClick={() => onOpenModal()}>
      <i className="fas fa-plus create-event-btn__icon"></i>Create
    </button>
    <div className="navigation">
      <button className="navigation__today-btn button" onClick={() => resetDate()}>
        Today
      </button>
      <button className="icon-button navigation__nav-icon" onClick={() => getPrevWeek()}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="icon-button navigation__nav-icon" onClick={() => getNextWeek()}>
        <i className="fas fa-chevron-right"></i>
      </button>
      <span className="navigation__displayed-month">{month}</span>
    </div>
  </header>
);

Header.propTypes = {
  resetDate: PropTypes.func.isRequired,
  getNextWeek: PropTypes.func.isRequired,
  getPrevWeek: PropTypes.func.isRequired,
  month: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default Header;
