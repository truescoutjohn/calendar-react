import React from 'react';
import PropTypes from 'prop-types';
import './modalChange.scss';

const ModalChange = ({ onEventDelete, id }) => (
  <div className="modal__wrapper">
    <button className="modal__delete" onClick={() => onEventDelete(id)}>
      <i className="fas fa-trash"></i> Delete
    </button>
  </div>
);

ModalChange.propTypes = {
  onEventDelete: PropTypes.func.isRequired,
};

export default ModalChange;
