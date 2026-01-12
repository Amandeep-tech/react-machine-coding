import React, { useEffect, useRef, useState } from "react";

const DropDown = ({ options, selectedValues, onChange }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const [activeIndex, setActiveIndex] = useState(-1);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTrigger = () => {
    setOpen((prev) => !prev);
  };

  const handleItemClick = (option) => {
    console.log(option);
    const isPresent = selectedValues.find(
      (sv) => sv.toLowerCase() === option.toLowerCase()
    );
    if (isPresent) {
      // filter it out
      onChange(prev => prev.filter(
        (sv) => sv.toLowerCase() !== option.toLowerCase()
      ))
      return;
    } else {
      onChange(prev => [...prev, option]);
    }
  };

  const handleKeyDown = (e) => {
    console.log("e", e);
    if (e.key === "Tab") {
      setOpen(true);
      return;
    }
    if(e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
    } else if (e.key === "Enter") {
      handleItemClick(options[activeIndex]);
    }
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="chips">
        {selectedValues.length
          ? selectedValues.map((sv) => (
              <button
                key={sv}
                className="chip"
                onClick={() => handleItemClick(sv)}
              >
                {sv}
              </button>
            ))
          : null}
        <div>
          <input
            type="text"
            onKeyDown={handleKeyDown}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder="Search..."
            className="inp_search"
          />
        </div>
      </div>
      {open ? (
        <ul role="listbox">
          {options.map((option, index) => (
            <li
              role="option"
              className={`${activeIndex === index ? "focused" : ""}
              ${
                selectedValues.includes(option) ? "sv" : ""
              }`}
              aria-selected={selectedValues.includes(option)}
              key={option}
              onClick={() => handleItemClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default DropDown;
