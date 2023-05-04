import React, { useState, useEffect } from 'react';
import {AM_PM_currentTime, dayOfWeek, currentMonth, currentDate, setDateEnding} from "../utils/timeFormats";

const Clock = () => {
    const dateString = () => `${dayOfWeek()}, ${currentMonth()} ${currentDate()}${setDateEnding(currentDate())} - ${AM_PM_currentTime()}`;

    const [clock, setClock] = useState(dateString());

    const startClock = () => setInterval(() => {
        setClock(dateString());
    }, 1000);

    useEffect(() => {
        startClock();
    }, []);

  return (
    <div className='clock-container'>
        <p>{clock}</p>
    </div>
  )
}

export default Clock;