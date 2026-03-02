import React, { useRef, useState } from "react";
import "./styles.css";
import AutoComplete from "./components/AutoComplete";
import debounce from "./hooks/debounce";

const URL = "https://dummyjson.com/recipes/search";

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cacheRef = useRef({});
  const abortController = useRef(null);

  const fetchSuggestions = debounce(async (query) => {
    if (!query.trim()) {
      setData(null);
      setError(null);
      setIsLoading(false);
      return;
    };

    query = query.toLowerCase();

    if(cacheRef.current[query]) {
      setData(cacheRef.current[query])
      return; 
    }

    if(abortController.current) {
      abortController.current.abort();
    }
    const controller = new AbortController();
    abortController.current = controller

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${URL}?q=${query}`, {
        signal: controller?.signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch, try again`);
      }

      const result = await response.json();
      setData(result?.recipes);
      cacheRef.current[query] = result?.recipes
    } catch (err) {
      if(err.name === "AbortError") return;
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, 700);

  return (
    <div className="app">
      <AutoComplete
        placeholder={"Search..."}
        data={data || null}
        isLoading={isLoading}
        error={error}
        fetchSuggestions={fetchSuggestions}
      />
    </div>
  );
};

export default App;
