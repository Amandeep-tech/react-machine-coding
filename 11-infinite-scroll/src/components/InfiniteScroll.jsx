import { useEffect, useRef, useState } from "react";

// user scrolls
// when last element comes in view port, loadMoreData()
// repeat this process until API says hasMore is false or data length is 0

export default function InfiniteScroll(props) {
  const { data, loadData, hasMoreData, loading, error, renderItem } = props;

  const observerRef = useRef(null);
  const lastElementRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMoreData) {
        loadData()
      }
    });

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [loading, hasMoreData]);

  return (
    <div className="infinite_scroll">
      {error ? <div>{error}</div> : null}
      {data?.length > 0 ? (
        <ul>
          {data.map((item, index) => {
            if (index === data.length - 1) {
              return (
                <li ref={lastElementRef} key={item.title}>
                  {renderItem(item)}
                </li>
              );
            }
            return <li key={item.title}>{renderItem(item)}</li>;
          })}
        </ul>
      ) : null}
      {loading ? <div>Loading data...</div> : null}
    </div>
  );
}
