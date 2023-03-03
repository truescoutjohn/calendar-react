import React from "react";
import PropTypes from "prop-types";
import Modal from "../modal/Modal.jsx";
import normalizeFormData from "../../utils/transformDate.js";
import { addEvent, getEvents } from "../../gateway/events.js";

const AddEventForm = ({
  hideModal,
  dataSelectedDate,
  events,
  setEvents,
  setErrorMessage,
  setDataSelectedDate,
  setIsError,
}) => {
  const submitFormHandler = (event) => {
    event.preventDefault();
    const [transformedEventData, errorText] = normalizeFormData(event, events);
    if (!transformedEventData) {
      setErrorMessage(errorText);
      setIsError(true);
      hideModal();
      return null;
    }

    addEvent(transformedEventData).then((statusResponse) => {
      if (statusResponse) {
        getEvents().then((allEvents) => setEvents(allEvents));
      } else {
        throw new Error("Something happens with request");
      }
    });

    hideModal();
    setDataSelectedDate(new Date());
    return null;
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
  hideModal: PropTypes.func.isRequired,
  dataSelectedDate: PropTypes.object.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default AddEventForm;
