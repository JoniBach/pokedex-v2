/* eslint-disable  @typescript-eslint/no-unused-vars */
import Old from "./pages/old";
import Main from "./pages/main";

import React from "react";
import { render } from "react-dom";
// import { Router, Link, RouteComponentProps } from "@reach/router"
import { usePokedex } from "./contexts/PokedexContext";
import { Route, HashRouter as Router, Routes } from "react-router-dom";

const Test = () => {
  return <div>hi</div>;
};
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={ <Main />} />
      </Routes>

    </Router>
  );
}

export default App;
