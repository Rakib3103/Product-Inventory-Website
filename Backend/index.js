import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Database Connected")
})

// Mongoose Models

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)


// Defining routes
//Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user){
            if (password === user.password) {
                res.send({message: "Login Successful", user: user})
            } else {
            res.send({message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })        
})

// Creating Object Of the User
//Register API
app.post("/register", (req, res) => {
    const { name, email, password } = req.body
    //Search MongoDB documentation for .findOne function
    User.findOne({email: email}, (err, user) => {
        if (user){
            res.send({message: "User already registered"})
        } else{
            //Creating a user in MongoDB according to the Name, Email, Password
            const user = new User({
                name,
                email,
                password
            })
            user.save( err => {
                if(err){
                    res.send(err)
                } else{
                    res.send({ message: "Successfully Registered" })
                }
            })
        }
    })
})

app.listen(9002, () => {
    console.log("BE started at port 9002")
})
