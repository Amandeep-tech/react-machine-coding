import { useState } from "react";
import "./styles.css";
import Dropdown from "./components/Dropdown";

const options = ["Aman", "Pankaj", "Deep", "Rahul"];

export default function App() {
  const [value, setValue] = useState("");

  return (
    <div className="app">
      <Dropdown
        options={options}
        selectedValue={value}
        onChange={(option) => {
          setValue(option);
        }}
      />
    </div>
  );
}
