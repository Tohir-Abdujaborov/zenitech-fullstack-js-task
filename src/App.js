import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Recent from "./pages/Recent";
import Search from "./pages/Search";

//AUTHOR: Tohirjon Abdujaborov || Zenitech Full-Stack JavaScript Task

//Please open 'back-end' folder, then run 'node app.js' for starting server

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Recent} />
        <Route path="/search" component={Search} />
      </Switch>
    </Router>
  );
}

export default App;
