
import Old from './pages/old';
import Main from './pages/main';

import React from "react"
import { render } from "react-dom"
import { Router, Link, RouteComponentProps } from "@reach/router"

function App() {
  let Home = (props: RouteComponentProps) => <Main />

  return (
    <Router>
      <Home path="/" />
    </Router>
  )
}

export default App;



