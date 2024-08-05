import React, { useEffect, useRef } from "react";

import './timeScale.scss';

const TimeScale = () => {
  const redLineRef = useRef(null);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    if (redLineRef.current) {
      redLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  useEffect(() => {
    ['mousemove', 'keydown', 'scroll'].forEach(event => {
      window.addEventListener(event, resetInterval, { passive: true });
    });
    startInterval();

    return () => {
      ['mousemove', 'keydown', 'scroll'].forEach(event => {
        window.removeEventListener(event, resetInterval);
      });
      clearTimeout(intervalIdRef.current);
    };
  }, []);

  const resetInterval = () => {
    if(intervalIdRef.current) {
      clearTimeout(intervalIdRef.current);
    }
    startInterval();
  }

  const startInterval = () => {
    intervalIdRef.current = setTimeout(() => {
      startInterval();
    }, 60000);
  }

  const calculateRedLinePosition = () => {
    const currentTime = new Date();
    const minutesSinceStartOfDay = currentTime.getHours() * 60 + currentTime.getMinutes();
    return minutesSinceStartOfDay;
  };

  return (
    <div 
      className="red-line"
      ref={redLineRef}
      style={{ top: `${calculateRedLinePosition()}px` }}></div>)
}

export default TimeScale;
