import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const fetchItems = (page) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      // Stop after page 10 for example
      if (page > 10) {
        res([]);
        return;
      }
      const items = Array.from({ length: 10 }, (v, i) => ({
        id: page * 10 + i,
        text: `Item ${page * 10 + i}`,
      }));
      res(items);
    }, 1000);
  });
};

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchedPagesRef = useRef(new Set());

  const loaderRef = useRef(null);

  const loadingRef = useRef(null);
  const hasMoreDataRef = useRef(null);

  useEffect(() => {
    loadingRef.current = loading;
    hasMoreDataRef.current = hasMoreData;
  }, [loading, hasMoreData]);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !loadingRef.current &&
          hasMoreDataRef.current
        ) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.1,
      },
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasMoreData) return;

    if (fetchedPagesRef.current.has(page)) return;

    fetchedPagesRef.current.add(page);

    async function fetchData(page) {
      try {
        setLoading(true);
        setError("");
        const resp = await fetchItems(page);

        if (resp && resp.length === 0) {
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
      <div
        className="loader_ref"
        ref={loaderRef}
        style={{ height: "50px", margin: "20px 0" }}
      >
        {loading && hasMoreData && "Loading more..."}
      </div>
      {!loading && (!data || data.length === 0) ? (
        <div>No Data, try again</div>
      ) : null}
    </div>
  );
};

export default InfiniteScroll;
