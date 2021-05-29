import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

import "./index.css";
// import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.min.js";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);