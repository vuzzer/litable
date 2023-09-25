"use strict";
const express = require("express")
const app = express()

const cors = require("cors");
const bodyParser = require("body-parser");


//Middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors({
    option: "*"
}))


app.post("/addRental", (req, res, next) => {
    const data = req.body;
    console.log(data);
    res.send(JSON.stringify({register: "register successful"}))
});


app.listen(3000, () => {
    console.log("Server is listening port 3000");
});