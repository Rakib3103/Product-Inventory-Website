import React, { useState } from "react"
import "./register.css"
import axios from "axios" //For Calling API's

const Register = () => {
    
    const [user, setUser] = useState({
        name: " ",
        email:" ",
        phone:" ",
        password:" ",
        reEnterPassword:" "
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password } = user
        axios.post("http://localhost:9002/register", user)
    }



    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={ user.name } placeholder="Full Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={ user.email } placeholder="Email" onChange={ handleChange }></input>
            <input type="text" name="phone" value={ user.phone } placeholder="Phone Number" onChange={ handleChange }></input>
            <input type="password" name="password" value={ user.password } placeholder="Password" onChange={ handleChange }></input>
            <input type="reEnterPassword" name="reEnterPassword" value={ user.reEnterPassword } placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register}>Register</div>
            <div>or</div>
            <div className="button">Login</div>
        </div>
    )
}

export default Register