// import './path/to/styles.css';
import React, { useState } from 'react';
import './App.css';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import Statistics from './components/statistics/statistics';  // New import for the Statistics component
import Data from './components/data/data';  // New import for the Data component
import Inbox from './components/inbox/inbox';  // Adjust this path as needed
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [ user, setLoginUser ] = useState({})

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id
              ? <Homepage/>
              : <Login setLoginUser={setLoginUser}/>
            }
          </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/statistics">  {/* New Route for Statistics */}
            <Statistics />
          </Route>
          <Route path="/data">  {/* New Route for Data */}
            <Data />
          <Route path="/inbox">
            <Inbox/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
