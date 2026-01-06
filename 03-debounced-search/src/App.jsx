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
    if(cacheRef.current[query]) {
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
      cacheRef.current[query] = resp;
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleQuery = (e) => {
    const text = e.target.value;
    setQuery(text);
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
        />
        <div className="container results">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <ul>
              {results.map((result) => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
