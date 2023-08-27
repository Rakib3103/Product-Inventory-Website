import React, { useState } from "react";
import PropTypes from "prop-types";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const login = () => {
    axios.post("http://localhost:9002/login", user)
      .then(res => {
        alert(res.data.message);
        setLoginUser(res.data.user);
        history.push("/");
      });
  };

  return (
    <div className="Header">
      <h1>Product Inventory Website</h1>
    <div className="login">
      {console.log(user)}
      <h1>Login</h1>
      <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email" />
      <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" />
      <div className="button" onClick={login}>Login</div>
      <div>or</div>
      <div className="button" onClick={() => history.push("/register")}>Register</div>
    </div>
    </div>
  );
};

// Adding PropTypes
Login.propTypes = {
  setLoginUser: PropTypes.func.isRequired
};

export default Login;
