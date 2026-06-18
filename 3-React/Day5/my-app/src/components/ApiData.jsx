import React, { useEffect } from "react";
import { useState } from "react";

function ApiData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );
        const result = await response.json();
        if (!response.ok) {
          throw new Error("Error while fetching data");
        }
        console.log(result);
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1></h1>
  }

  return (
    <>
      <h1>Api Data fetching :</h1>
      <div>
        {data.slice(0, 10).map((item, ind) => (
          <p key={item.id}>
            {ind + 1}. {item.title}
          </p>
        ))}
      </div>
    </>
  );
}

export default ApiData;
