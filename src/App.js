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
import { useEffect, useState } from "react";

const App = () => {
  const [state1, setState1] = useState();
  const [state2, setState2] = useState();
  const [state3, setState3] = useState();
  const [state4, setState4] = useState();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      if (registrations.length) {
        setState3("Service Worker установлен");
        setState4(registrations);
      } else {
        setState3("Service Worker не установлен");
      }
    });
  }
  const test = async () => {
    const app_cache = await caches?.open();
    console.log("app_cache", app_cache);
    setState1(JSON.stringify(app_cache));
    const response = await app_cache?.match("/path/to/your/data");
    console.log("response", response);
    setState2(JSON.stringify(response));
  };
  useEffect(() => {
    test();
    console.log("test");
  });
  return (
    <ApplicationState.Provider>
      <Router>
        <Routes />
      </Router>
      <div>state1 {state1}</div>
      <div>state2 {state2}</div>
      <div>state3 {state3}</div>
      <div>
        state4{" "}
        {state4.map((i) => (
          <div>{JSON.stringify(i)}</div>
        ))}
      </div>
    </ApplicationState.Provider>
  );
};

export default App;
