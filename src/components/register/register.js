import React, { useState } from "react"
import "./register.css"
import axios from "axios" //For Calling API's
import { useHistory } from "react-router-dom"

const Register = () => {
    const history = useHistory()    
    const [user, setUser] = useState({
        name: "",
        email:"",
        phone:"",
        password:"",
        reEnterPassword:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if (name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/register", user)
            .then(res => console.log(res))
            .catch(err => console.log(err)); // Handle error        
        } else{
            alert("Invalid Input")
        }
    }



    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={ user.name } placeholder="Full Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={ user.email } placeholder="Email" onChange={ handleChange }></input>
            <input type="text" name="phone" value={ user.phone } placeholder="Phone Number" onChange={ handleChange }></input>
            <input type="password" name="password" value={ user.password } placeholder="Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={ user.reEnterPassword } placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register}>Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
    )
}

export default Register