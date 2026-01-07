import { useEffect, useRef, useState } from "react";
import "./styles.css";

const fetchUsers = (query) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const users = [
        "Amandeep",
        "Aman",
        "Rohit",
        "Roshan",
        "Rahul",
        "Ankit",
        "Neha",
        "Neemaa",
        "Nikita",
        "Nimisha",
      ];

      resolve(
        users.filter((name) => name.toLowerCase().includes(query.toLowerCase()))
      );
    }, 800);
  });

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [activeIndex, setActiveIndex] = useState(-1);

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
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      const resp = await fetchUsers(query.trim());
      // Ignore stale response
      if (currentReqId !== lastQueryId.current) {
        setLoading(false);
        return;
      }
      setResults(resp);
      // store new key:value pairs in cache as well.
      cacheRef.current[query.trim()] = resp;
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    // reset active index to -1 for new results :)
    setActiveIndex(-1);
  }, [results]);

  const handleQuery = (e) => {
    const text = e.target.value;
    setQuery(text);
  };

  const handleKeyDown = (e) => {
    if (!results.length) return;

    const key = e.key;

    switch (key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % results.length);
        break;
      case "ArrowUp":
        e.preventDefault();

        setActiveIndex((prev) =>
          prev > 0 ? (prev - 1) % results.length : results.length - 1
        );
        break;
      case "Escape":
        setResults([]);
        setQuery("");
        setActiveIndex(-1);
        break;
      case "Enter":
        if (activeIndex >= 0) {
          alert(`Selected ${results[activeIndex]}`);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="app">
      <div className="debounced_search">
        <div className="mb">
          <label htmlFor="search">Search for name</label>
        </div>
        <input
          type="text"
          id="search"
          placeholder="Search..."
          value={query}
          onChange={handleQuery}
          onKeyDown={handleKeyDown}
        />
        <div className="container results">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <ul role="listbox">
              {results.map((result, index) => (
                <li
                  role="option"
                  aria-selected={index === activeIndex}
                  key={result}
                  className={index === activeIndex ? "active" : ""}
                >
                  {result}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
