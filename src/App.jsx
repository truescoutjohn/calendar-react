// Algo to change week
// 1. Determine function which is set current Date to today date
// 2. Determine function which is shifted date to next week
// 3. Determine function which is shifted date to previous week
import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import {
  getWeekStartDate,
  generateWeekRange,
  getApproppriateMonths,
  goToCertainDate,
} from './utils/dateUtils.js';

import './common.scss';

const App = props => {
  const [currentDate, _] = useState(new Date());
  const [dataSelectedDate, setDataSelectedDate] = useState(new Date());
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const [weekDates, setWeekDates] = useState(generateWeekRange(getWeekStartDate(weekStartDate)));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setWeekDates(generateWeekRange(getWeekStartDate(weekStartDate)));
  }, [weekStartDate]);

  const setCurrentDate = () => {
    setWeekStartDate(getWeekStartDate(new Date()));
  };

  const calculateWeekRange = direction => {
    const calculatedWeek = goToCertainDate(weekStartDate, direction);

    setWeekStartDate(calculatedWeek);
    setWeekDates(generateWeekRange(calculatedWeek));
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setDataSelectedDate(new Date());
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const getNextWeek = () => {
    calculateWeekRange('forward');
  };

  const getPrevWeek = () => {
    calculateWeekRange('backward');
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
        weekDates={weekDates}
        isModalOpen={isModalOpen}
        hideModal={hideModal}
        openModal={openModal}
        dataSelectedDate={dataSelectedDate}
        setDataSelectedDate={setDataSelectedDate}
        dataCurrentDate={currentDate}
        startDateWeek={weekStartDate}
      />
    </>
  );
};

export default App;
