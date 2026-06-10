
import { useRef, useState } from "react";

const Stopwatch = () => {
  const [timer, setTimer] = useState(3810); 
  const timerIdRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  // Time Math Calculations
  const hour = String(Math.floor(timer / 3600)).padStart(2, "0");
  const minute = String(Math.floor((timer / 60) % 60)).padStart(2, "0");
  const second = String(timer % 60).padStart(2, "0");

  const handleStart = () => {
    // FIX 1: If an interval is already running, exit early to stop double-triggers
    if (timerIdRef.current !== null) return;

    timerIdRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    setIsRunning(true);
  };

  const handleStop = () => {
    clearInterval(timerIdRef.current);
    // FIX 2: Reset the ref back to null so handleStart knows it is clear
    timerIdRef.current = null; 
    setIsRunning(false);
  };

  const handleReset = () => {
    handleStop(); // Clears interval and resets ref/running state first
    setTimer(0);
  };

  return (
    <>
    <h2 style={{color: "green"}}>StopWatch</h2>
      <h2 style={{color: "red"}}>
        {hour}:{minute}:{second}
      </h2>
      <div>
        <button onClick={isRunning ? handleStop : handleStart}>
          {isRunning ? "stop" : "start"}
        </button> 
        <button onClick={handleReset}>reset</button>
      </div>
    </>
  );
};

export default Stopwatch;
