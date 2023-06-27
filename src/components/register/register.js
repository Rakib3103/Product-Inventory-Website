import React, { useState } from "react"
import "./register.css"

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
    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={ user.name } placeholder="Full Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={ user.email } placeholder="Email" onChange={ handleChange }></input>
            <input type="text" name="phone" value={ user.phone } placeholder="Phone Number" onChange={ handleChange }></input>
            <input type="password" name="password" value={ user.password } placeholder="Password" onChange={ handleChange }></input>
            <input type="reEnterPassword" name="reEnterPassword" value={ user.reEnterPassword } placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button">Register</div>
            <div>or</div>
            <div className="button">Login</div>
        </div>
    )
}

export default Register