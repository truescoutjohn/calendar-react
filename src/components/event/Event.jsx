import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalDelete from "../modal-delete/ModalDelete.jsx";
import "./event.scss";

const Event = ({ id, height, marginTop, title, time, onEventDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const eventStyle = {
    height,
    marginTop,
  };

  const toggleModal = (event) => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <div style={eventStyle} className="event" onClick={toggleModal}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {isModalOpen && <ModalDelete onEventDelete={onEventDelete} id={id} />}
    </div>
  );
};

Event.propTypes = {
  id: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onEventDelete: PropTypes.func.isRequired,
};

export default Event;
