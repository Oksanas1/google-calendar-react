import React, { memo } from "react";

import "./sidebar.scss";

const Sidebar = () => {
  const hours = Array.from({ length: 24 }, (_, index) => index);

  return (
    <div className="calendar__time-scale">
      {hours.map((hour) => (
        <div key={hour} className="time-slot">
          <span className="time-slot__time">{`${hour}:00`}</span>
        </div>
      ))}
    </div>
  );
};

export default memo(Sidebar);
