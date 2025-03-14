/**
 * @name app.js
 * @fileoverview Exports the frontend application as <App/> Component,
 * Initialises Application Routes using react-router and React components from /views.
 * Renders global state providers.
 */

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "routes";
import { ApplicationState } from "containers/application/state";
import "utils/localization";
import { useEffect } from "react";

const App = () => {
  const test = async () => {
    const app_cache = await caches?.open("app");
    console.log("app_cache", app_cache);
    const response = await app_cache?.match("/path/to/your/data");
    console.log("response", response);
  };
  useEffect(() => {
    test();
  });
  return (
    <ApplicationState.Provider>
      <Router>
        <Routes />
      </Router>
    </ApplicationState.Provider>
  );
};

export default App;
