const express = require("express");
const app = express();
const calendar = require("./calendar-config");
const port = 3000;

app.set("view-engine", "js");
const path = require('path');
__dirname = path.resolve();
app.use(express.static((path.join(__dirname, 'views'))));


app.get("/",(req,res)=>{
    const year = req.query.year || 2020;
    const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

    res.render("index.js",{calendar: calendar(year),months,year});
});

app.listen(port,()=>{
    console.log("app is listening on port", port);
});