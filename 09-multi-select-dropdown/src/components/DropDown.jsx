import React, { useEffect, useRef, useState } from "react";

const DropDown = ({ options, selectedValues, onChange }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
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
      const newSelectedValues = selectedValues.filter(
        (sv) => sv.toLowerCase() !== option.toLowerCase()
      );
      onChange(newSelectedValues);
      return;
    } else {
      onChange([...selectedValues, option]);
    }
  };
  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="chips">
        {selectedValues.length
          ? selectedValues.map((sv) => (
              <button key={sv} className="chip" onClick={() => handleItemClick(sv)}>
                {sv}
              </button>
            ))
          : null}
          <div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          // onBlur={() => setOpen(false)}
          placeholder="Search..."
          className="inp_search"
        />
        </div>
      </div>
      {open ? (
        <ul>
          {options.map((option) => (
            <li
              className={`${selectedValues.includes(option) ? "sv" : ""}`}
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
