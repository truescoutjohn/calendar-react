import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal.jsx';
import normalizeFormData from '../../utils/transformDate.js';
import { addEvent, getEvents } from '../../gateway/events.js';

const AddEventForm = ({
  isModalOpen,
  hideModal,
  dataSelectedDate,
  events,
  setEvents,
  setErrorMessage,
  setIsError,
}) => {
  if (!isModalOpen) {
    return null;
  }

  const submitFormHandler = event => {
    event.preventDefault();
    const [transformedEventData, errorText] = normalizeFormData(event, events);
    if (!transformedEventData) {
      setErrorMessage(errorText);
      setIsError(true);
      hideModal();
      return null;
    }

    addEvent(transformedEventData).then(statusResponse => {
      if (statusResponse) {
        getEvents().then(allEvents => setEvents(allEvents));
      } else {
        throw new Error('Something happens with request');
      }
    });

    hideModal();
    return undefined;
  };

  return (
    <Modal
      submitFormHandler={submitFormHandler}
      onCloseModal={hideModal}
      dataSelectedDate={dataSelectedDate}
    />
  );
};

AddEventForm.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  dataSelectedDate: PropTypes.object.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default AddEventForm;
