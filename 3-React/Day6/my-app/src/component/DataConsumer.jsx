import React, { useContext } from "react";
import { dataContext } from "../context/DataProvider";

function DataConsumer() {
  const { data, fetchData } = useContext(dataContext);
  console.log(data);

  return (
    <>
      <button onClick={fetchData}>Fetch Data</button>
      {data.loading && <p>Loading...</p>}
      {data.error && <p>Error:{data.error}</p>}
      {data.value &&
        data.value
          .slice(0, 20)
          .map((item) => <p key={item.id}>{item.title}</p>)}
    </>
  );
}

export default DataConsumer;
