import React, { useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import { getWeekStartDate } from "./utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(
    getWeekStartDate(new Date()),
  );
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <Header
        handleOpenModal={handleOpenModal}
        setWeekStartDate={setWeekStartDate}
        weekStartDate={weekStartDate}
      />
      <Calendar
        weekStartDate={weekStartDate}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
        isOpenModal={isOpenModal}
      />
    </>
  );
};

export default App;
