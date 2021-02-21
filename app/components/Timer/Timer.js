import React, { useState, useEffect } from 'react';

const Timer = ({
    toggle,
    reset
}) => {
  const [mlseconds, setMlseconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

//   function toggle() {
//     setIsActive(!isActive);
//   }

//   function reset() {
//     setMlseconds(0);
//     setIsActive(false);
//   }
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1.')
  }
  useEffect(() => {
    setIsActive(!isActive);
  }, [toggle]);
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setMlseconds(mlseconds => mlseconds + 1);
      }, 10);
    } else if (!isActive && mlseconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, mlseconds]);
  useEffect(() => {
    setMlseconds(0);
    setIsActive(false);
  }, [reset]);

  return (
    <div className="time">{formatNumber(mlseconds)}ms</div>
    // <div className="app">
    //   <div className="time">
    //     {formatNumber(mlseconds)}ms
    //   </div>
    //   <div className="row">
    //     <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
    //       {isActive ? 'Pause' : 'Start'}
    //     </button>
    //     <button className="button" onClick={reset}>
    //       Reset
    //     </button>
    //   </div>
    // </div>
  );
};

export default Timer;