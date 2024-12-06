import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import './App.css';

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);  // Tiempo en segundos
  const [isSession, setIsSession] = useState(true); // Si es una sesión o descanso
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            setIsSession(!isSession);
            return isSession ? breakLength * 60 : sessionLength * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);  // Limpiar intervalos
  }, [isRunning, timeLeft, isSession, breakLength, sessionLength]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(sessionLength * 60);
    setIsSession(true);
  };

  const handleIncrementSession = () => {
    if (sessionLength < 60) setSessionLength(sessionLength + 1);
  };

  const handleDecrementSession = () => {
    if (sessionLength > 1) setSessionLength(sessionLength - 1);
  };

  const handleIncrementBreak = () => {
    if (breakLength < 60) setBreakLength(breakLength + 1);
  };

  const handleDecrementBreak = () => {
    if (breakLength > 1) setBreakLength(breakLength - 1);
  };

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <div id="break-label">Break Length</div>
      <div id="break-length">{breakLength}</div>
      <button id="break-decrement" onClick={handleDecrementBreak}>-</button>
      <button id="break-increment" onClick={handleIncrementBreak}>+</button>
      
      <div id="session-label">Session Length</div>
      <div id="session-length">{sessionLength}</div>
      <button id="session-decrement" onClick={handleDecrementSession}>-</button>
      <button id="session-increment" onClick={handleIncrementSession}>+</button>
      
      <Timer timeLeft={timeLeft} isSession={isSession} />
      
      <button id="start_stop" onClick={handleStartStop}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button id="reset" onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
