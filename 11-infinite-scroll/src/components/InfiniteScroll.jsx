import { useEffect, useRef, useState } from "react";

// user scrolls
// when last element comes in view port, loadMoreData()
// repeat this process until API says hasMore is false or data length is 0

export default function InfiniteScroll() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);

  const [hasMoreData, setHasMoreData] = useState(true);

  const observerRef = useRef(null);
  const lastElementRef = useRef(null);

  useEffect(() => {
    void fetchData(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    if (loading) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMoreData) {
        setPageNumber((prev) => prev + 1);
      }
    });

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [loading, hasMoreData]);

  const fetchData = async (page) => {
    try {
      if (!hasMoreData || loading) return;
      setLoading(true);
      setError(false);
      let resp = await fetch(
        `https://openlibrary.org/search.json?q=page=${page}&limit=${100}`,
      );
      if (!resp.ok) {
        throw new Error("Response is not ok");
      }
      resp = await resp.json();
      setData((prev) => [...prev, ...resp.docs]);
      setHasMoreData(resp.docs.length > 0);
      console.log("resp ", resp);
    } catch (err) {
      console.err("Error", err);
      setError("Something went wrong, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="infinite_scroll">
      {data?.length > 0 ? (
        <ul>
          {data.map((item, index) => {
            if (index === data.length - 1) {
              return (
                <li ref={lastElementRef} key={item.title}>
                  {item.title}
                </li>
              );
            }
            return <li key={item.title}>{item.title}</li>;
          })}
        </ul>
      ) : null}
      {loading ? <div>Loading data...</div> : null}
      {error ? <div>{error}</div> : null}
    </div>
  );
}
