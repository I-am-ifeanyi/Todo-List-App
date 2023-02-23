import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StateManager } from "./StateManager";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StateManager>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateManager>
  </React.StrictMode>
);
