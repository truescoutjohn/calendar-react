import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE } from '../../utils/dateUtils.js';
import { QUARTER_HOUR } from '../../utils/validateForm.js';
import './modal.scss';

// Algo
// 1. Divide date minutes to 15 and trunc fraction
// 2. Compare result
//   2.1. if it integer just multiply on 15
//   2.2. else add 1 and multiply result on 15

const Modal = ({ submitFormHandler, onCloseModal, dataSelectedDate = new Date() }) => {
  const minutes = dataSelectedDate.getMinutes() / QUARTER_HOUR;
  let remainQuarterInMinutes = Number.isInteger(minutes) ? minutes : Math.trunc(minutes) + 1;

  if (remainQuarterInMinutes === 0 && dataSelectedDate === new Date()) {
    remainQuarterInMinutes += 1;
  }

  const destinyDate = new Date(
    dataSelectedDate -
      dataSelectedDate.getMinutes() * MILLISECONDS_IN_MINUTE +
      remainQuarterInMinutes * QUARTER_HOUR * MILLISECONDS_IN_MINUTE,
  );
  const [inputValue, setInputValue] = useState({
    date: moment(destinyDate).format('YYYY-MM-DD'),
    startTime: moment(destinyDate).format('HH:mm'),
    endTime: moment(new Date(destinyDate.getTime() + 6 * MILLISECONDS_IN_HOUR)).format('HH:mm'),
    description: '',
    title: '',
  });

  const formChangeHandler = event => {
    setInputValue(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={onCloseModal}>
            +
          </button>
          <form method="post" className="event-form" onSubmit={submitFormHandler}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={inputValue.title}
              onChange={formChangeHandler}
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={inputValue.date}
                onChange={formChangeHandler}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                step="900"
                value={inputValue.startTime}
                onChange={formChangeHandler}
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                step="900"
                className="event-form__field"
                value={inputValue.endTime}
                onChange={formChangeHandler}
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={inputValue.description}
              onChange={formChangeHandler}
            />
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  submitFormHandler: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
