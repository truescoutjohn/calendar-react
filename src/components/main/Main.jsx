import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Week from '../week/Week.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';
import AddEventForm from '../addEvent/AddEventModal.jsx';
import { deleteEvent, getEvents } from '../../gateway/events.js';
import { isDeletable } from '../../utils/validateForm.js';
import './main.scss';
import PopupErrors from '../popup-errors/PopupErrors.jsx';

const Main = ({
  events,
  dataCurrentDate,
  weekDates,
  isModalOpen,
  clickHandler,
  dataSelectedDate,
  hideModal,
  setEvents,
}) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [width, setWidth] = useState(0);

  const deleteEventFromServer = id => {
    const event = events.find(e => e.id === id);
    const [isDeleted, newErrorMessage] = isDeletable(event, dataCurrentDate);

    if (!isDeleted) {
      setIsError(true);
      setErrorMessage(newErrorMessage);
      return null;
    }

    deleteEvent(id).then(statusResponse => {
      if (statusResponse) {
        getEvents().then(deletedEvent => setEvents(deletedEvent));
      } else {
        throw new Error('Something happens with request');
      }
    });
    return null;
  };
  return (
    <>
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            dataCurrentDate={dataCurrentDate}
            weekDates={weekDates}
            events={events}
            onEventDelete={deleteEventFromServer}
            clickHandler={clickHandler}
          />
        </div>
      </div>
      <AddEventForm
        events={events}
        setEvents={setEvents}
        dataSelectedDate={dataSelectedDate}
        hideModal={hideModal}
        isModalOpen={isModalOpen}
        setErrorMessage={setErrorMessage}
        setIsError={setIsError}
      />
      {isError && width <= 100 && (
        <PopupErrors
          errorText={errorMessage}
          width={width}
          setWidth={setWidth}
          setIsError={setIsError}
        />
      )}
    </>
  );
};

Main.propTypes = {
  dataCurrentDate: PropTypes.object.isRequired,
  weekDates: PropTypes.arrayOf(PropTypes.object).isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
  dataSelectedDate: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default Main;
