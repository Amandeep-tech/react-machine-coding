import React, { useEffect, useRef, useState } from "react";
import SuggestionList from "./SuggestionList";

const AutoComplete = (props) => {
  const { fetchSuggestions, data, placeholder, error, isLoading } = props;

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [isSelected, setIsSelected] = useState(null);

  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if(containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);

  }, []);

  useEffect(() => {
    if (data) {
      setIsOpen(true);
    }
  }, [data]);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setIsSelected(null);
    setQuery(val);
    fetchSuggestions(val);
  };

  const handleSuggestionClick = (name) => {
    setQuery(name);
    setIsSelected(name);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    switch(key) {
      case "ArrowDown":
        e.preventDefault(); 
        setActiveIndex(prev => prev < data?.length - 1 ? prev + 1: 0);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(prev => prev > 0 ? prev - 1: data?.length - 1);
        break;
      case "Enter":
        e.preventDefault();
        setQuery(data[activeIndex].name);
        setIsOpen(false)
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
    }


  }

  return (
    <div className="auto_complete" ref={containerRef}>
      <div className="search">
        <input
          type="search"
          placeholder={placeholder || "Search..."}
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      {isOpen && query && !isSelected ? (
        <div className="suggestions">
          <SuggestionList
            query={query}
            activeIndex={activeIndex}
            data={data}
            error={error}
            isLoading={isLoading}
            onClick={handleSuggestionClick}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AutoComplete;
