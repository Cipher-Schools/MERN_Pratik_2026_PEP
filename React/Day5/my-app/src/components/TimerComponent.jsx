import React, { useEffect, useState } from "react";

function TimerComponent() {
  const [seconds, setSeconds] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Timer Started...");
    let timer = setInterval(() => {
      console.log(`Time changing in ${seconds}s`);

      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      console.log("Timer stopped");
      clearInterval(timer);
    };
  }, [count]);
  return (
    <div>
      <h1>Time:{seconds}s</h1>
      <h1>Count:{count}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
    </div>
  );
}

export default TimerComponent;
