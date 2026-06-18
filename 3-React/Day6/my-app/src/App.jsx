import { createContext, useContext, useState } from "react";
import "./App.css";
import DataConsumer from "./component/DataConsumer";
import DataProvider from "./context/DataProvider";

// //1. creating the context
// const userContext = createContext();

function App() {
  // const [user, setUser] = useState("Raghav");

  //2. provide context
  return (
    <>
      {/* <userContext.Provider value={{ user, setUser }}>
        <Parent />
      </userContext.Provider> */}
      <h1>Hello From React</h1>

      <DataConsumer />
    </>
  );
}
// function Parent() {
//   return <Child />;
// }
// function Child() {
//   return <GrandChild />;
// }
// function GrandChild() {
//   //3. consuming the context
//   const consumer = useContext(userContext);
//   return <h1>Hello, I am {consumer.u}</h1>;
// }

export default App;
