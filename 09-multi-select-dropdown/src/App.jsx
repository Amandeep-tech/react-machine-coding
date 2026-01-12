import { useState } from "react";
import "./styles.css";
import DropDown from "./components/DropDown";

export default function App() {
  const [selectedValues, setSelectedValues] = useState([]);

  return (
    <div className="app">
      <DropDown
        options={["Aman", "Pankaj", "Deep", "Rahul"]}
        selectedValues={selectedValues}
        onChange={setSelectedValues}
      />
    </div>
  );
}
