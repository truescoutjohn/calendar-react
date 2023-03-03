import React, { useEffect, useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";

import {
  getWeekStartDate,
  generateWeekRange,
  getApproppriateMonths,
} from "./utils/dateUtils.js";

import "./common.scss";
const MILLISECONDS_IN_WEEK = 1000 * 60 * 60 * 24;
const DAYS_IN_WEEK = 7;

const App = () => {
  const [dataSelectedDate, setDataSelectedDate] = useState(new Date());
  const [weekStartDate, setWeekStartDate] = useState(
    getWeekStartDate(new Date())
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setWeekStartDate(weekStartDate);
  }, [weekStartDate]);

  const setCurrentDate = () => {
    setWeekStartDate(getWeekStartDate(new Date()));
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const changeWeek = (isDirectionForward) => {
    const oneDay = Date.parse(weekStartDate);
    const days = Math.floor(MILLISECONDS_IN_WEEK);
    const next = isDirectionForward
      ? oneDay + days * DAYS_IN_WEEK
      : oneDay - days * DAYS_IN_WEEK;
    setWeekStartDate(new Date(next));
  };

  const getNextWeek = () => {
    changeWeek(true);
  };

  const getPrevWeek = () => {
    changeWeek(false);
  };

  return (
    <>
      <Header
        getNextWeek={getNextWeek}
        getPrevWeek={getPrevWeek}
        resetDate={setCurrentDate}
        month={getApproppriateMonths(weekStartDate, getWeekStartDate)}
        onOpenModal={openModal}
      />
      <Calendar
        weekDates={generateWeekRange(weekStartDate)}
        isModalOpen={isModalOpen}
        hideModal={hideModal}
        openModal={openModal}
        dataSelectedDate={dataSelectedDate}
        setDataSelectedDate={setDataSelectedDate}
        startDateWeek={weekStartDate}
      />
    </>
  );
};

export default App;
