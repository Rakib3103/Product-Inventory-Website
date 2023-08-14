import React, { useState } from 'react';
import './App.css';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [ user, setLoginUser ] = useState({})
  return (
    <div className="App">
      <Router>
        <Switch> {/* Notice the uppercase 'S' here */}
          <Route exact path = "/">
            {
              user && user._id
              ? <Homepage/> 
              : <Login setLoginUser = {setLoginUser}/>
            }
          </Route>
          <Route path = "/login">
            <Login setLoginUser = {setLoginUser}/>
          </Route>
          <Route path = "/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
