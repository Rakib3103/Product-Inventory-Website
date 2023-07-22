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

app.post("/login", (req, res) => {
    res.send("My API login")
})

// Creating Object Of the User
app.post("/register", (req, res) => {
    const { name, email, password } = req.body
    //Creating a user in MongoDB according to the Name, Email, Password
    const user = new User({
        name,
        email,
        password
    })
    user.save( err => {
        if(err){
            res.send(err)
        }else{
            res.send({ message: "Successfully Registered" })
        }
    })
})

app.listen(9002, () => {
    console.log("BE started at port 9002")
})
