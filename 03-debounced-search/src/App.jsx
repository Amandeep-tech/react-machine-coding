import { useEffect, useRef, useState } from "react";
import "./styles.css";
import useDebouncedSearch from "./hooks/useDebouncedSearch";

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
    }, 500);
  });

export default function App() {
  const { query, setQuery, loading, results } = useDebouncedSearch(
    fetchUsers,
    500
  );

  console.log("query results", query, results);

  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current?.focus();
    }
  }, []);

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

  const highLightMatch = (text) => {
    const lowerQuery = query.toLowerCase();
    const lowerText = text.toLowerCase();

    // beforeMatch, match, afterMatch
    // return beforeMatch <mark>{match}</mark> afterMatch

    // query = 'an'
    // text = 'Amandeep'

    const matchIndex = lowerText.indexOf(lowerQuery);
    if (matchIndex === -1) return text;

    const beforeMatch = lowerText.slice(0, matchIndex);
    const match = lowerText.slice(matchIndex, matchIndex + query.length);
    const afterMatch = lowerText.slice(matchIndex + query.length);

    return (
      <>
        {beforeMatch}
        <mark>{match}</mark>
        {afterMatch}
      </>
    );
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
          ref={inputRef}
          placeholder="Search..."
          value={query}
          onChange={handleQuery}
          onKeyDown={handleKeyDown}
        />
        <div className="container results">
          {query && !loading && results.length === 0 && <div>No Results</div>}
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
                  {highLightMatch(result)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
