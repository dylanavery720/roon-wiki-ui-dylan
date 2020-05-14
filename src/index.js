import React from "react";
import { AppProvider } from "@8base/react-sdk";
import { BrowserRouter as Router } from "react-router-dom";

import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { authClient } from "./authClient";

const URI = "https://api.8base.com/cka2iw7iw000207mi4du2djah";

ReactDOM.render(
  <AppProvider uri={URI} authClient={authClient}>
    <Router>
      <App />
    </Router>
  </AppProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
