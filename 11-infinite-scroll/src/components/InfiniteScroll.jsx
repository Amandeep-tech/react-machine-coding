import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const fetchItems = (page) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const items = Array.from({ length: 10 }, (_, i) => ({
        id: page * 10 + i,
        text: `Item ${page * 10 + i}`,
      }));
      resolve(items);
    }, 1000);
  });

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchedPagesRef = useRef(new Set());

  useEffect(() => {
    if(!hasMoreData) return;

    if(fetchedPagesRef.current.has(page)) return;

    fetchedPagesRef.current.add(page);

    async function fetchData(page) {
      try {
        setLoading(true);
        setError("");
        const resp = await fetchItems(page);

        if(resp && resp.length === 0) {
          setHasMoreData(false);
          return;
        }

        if (resp && resp.length > 0) {
          // immutable updates
          setData((prev) => [...prev, ...resp]);
        }
        
      } catch (err) {
        console.error("error ", err);
        setError("Error Occured");
      } finally {
        setLoading(false);
      }
    }
    fetchData(page);
  }, [page]);

  return (
    <div className="infinite_scroll">
      {error ? <div>{error}</div> : null}
      {loading ? <div>Loading...</div> : null}
      <ul>
        {data && data.length > 0 ? (
          <>
            {data.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </>
        ) : null}
      </ul>
      {!loading && (!data || data.length === 0) ? (
        <div>No Data, try again</div>
      ) : null}
    </div>
  );
};

export default InfiniteScroll;
