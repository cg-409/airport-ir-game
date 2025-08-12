import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AirportIRGame from "./AirportIRGame.jsx";

// ✅ Root mount for React
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AirportIRGame />
  </React.StrictMode>
);
