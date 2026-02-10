import { useEffect, useState } from "react";
import "./App.css";
import ApiData from "./components/ApiData";
import TimerComponent from "./components/TimerComponent";

function App() {
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   document.title = `Document title changed ${count} times`;
  // }, [count]);

  return (
    <>
      {/* <ApiData /> */}

      {show && <TimerComponent />}

      <button onClick={() => setShow(!show)}>Show Timer</button>
    </>
  );
}

export default App;
