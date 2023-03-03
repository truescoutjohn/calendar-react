import React, { useState } from "react";
import PropTypes from "prop-types";
import Week from "../week/Week.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";
import AddEventForm from "../add-event/AddEventModal.jsx";
import { deleteEvent, getEvents } from "../../gateway/events.js";
import { canDelete } from "../../utils/validateForm.js";
import "./main.scss";
import PopupErrors from "../popup-errors/PopupErrors.jsx";

const Main = ({
  events,
  weekDates,
  isModalOpen,
  dataSelectedDate,
  setDataSelectedDate,
  hideModal,
  openModal,
  setEvents,
}) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [width, setWidth] = useState(0);

  const deleteEventFromServer = (id) => {
    const event = events.find((e) => e.id === id);
    try {
      canDelete(event);
    } catch (exception) {
      setIsError(true);
      setErrorMessage(exception);
      return null;
    }

    deleteEvent(id).then((statusResponse) => {
      if (statusResponse) {
        getEvents().then((deletedEvent) => setEvents(deletedEvent));
      } else {
        throw new Error("Something happens with request");
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
            weekDates={weekDates}
            events={events}
            onEventDelete={deleteEventFromServer}
            setDataSelectedDate={setDataSelectedDate}
            openModal={openModal}
          />
        </div>
      </div>
      {isModalOpen && (
        <AddEventForm
          events={events}
          setEvents={setEvents}
          dataSelectedDate={dataSelectedDate}
          setDataSelectedDate={setDataSelectedDate}
          hideModal={hideModal}
          isModalOpen={isModalOpen}
          setErrorMessage={setErrorMessage}
          setIsError={setIsError}
        />
      )}
      {isError && (
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
  weekDates: PropTypes.arrayOf(PropTypes.object).isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  dataSelectedDate: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default Main;
