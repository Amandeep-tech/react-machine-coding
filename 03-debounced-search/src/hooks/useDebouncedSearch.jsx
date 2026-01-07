import React, { useEffect, useRef, useState } from "react";

const useDebouncedSearch = (fn, delay = 500) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const lastQueryId = useRef(0);

  const cacheRef = useRef({});

  useEffect(() => {
    // for every query change, I have a new requestId
    const currentReqId = ++lastQueryId.current;
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    // check in CACHE first
    if (cacheRef.current[query.trim()]) {
      setResults(cacheRef.current[query]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      const resp = await fn(query.trim());
      // Ignore stale response
      if (currentReqId !== lastQueryId.current) {
        setLoading(false);
        return;
      }
      setResults(resp);
      // store new key:value pairs in cache as well.
      cacheRef.current[query.trim()] = resp;
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, fn]);

  return {
    query,
    setQuery,
    loading,
    results,
  };
};

export default useDebouncedSearch;
