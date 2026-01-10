import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ options, selectedValue, onChange }) => {
  const [open, setOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(-1);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!open) setActiveIndex(-1);
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      console.log(e.target);
      if (dropdownRef.current && !dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleTrigger = () => {
    setOpen((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    // if dropdown is closed and I click any arrow button
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      setActiveIndex(0);
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Enter") {
      onChange(options[activeIndex]);
    }
  };
  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        onClick={handleTrigger}
        aria-expanded={open}
        onKeyDown={handleKeyDown}
        className="trigger"
      >
        <div className="row">
          {selectedValue || "Select"}
          <span 
          aria-hidden={true}
          className={`arrow ${open ? 'animate_up' : 'animate_down'}`}>v</span>
        </div>
      </button>
      {open ? (
        <ul role="listbox">
          {options.map((option, index) => (
            <li
              role="option"
              aria-selected={activeIndex === index}
              key={option}
              className={`${activeIndex === index ? "active" : ""}`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
