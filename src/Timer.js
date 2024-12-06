import React from 'react';

function Timer({ timeLeft, isSession }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div id="timer">
      <div id="timer-label">{isSession ? 'Session' : 'Break'}</div>
      <div id="time-left">{`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</div>
    </div>
  );
}

export default Timer;
