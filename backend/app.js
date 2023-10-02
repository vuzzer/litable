"use strict";
const express = require("express")
const app = express()
const bodyParser = require("body-parser");

//Routing
const rentalRoute = require("./routes/rental");


//Middlewares
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE, PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next();
})

//Middleware routing
app.use("/rental", rentalRoute);


app.listen(3000, () => {
    console.log("Server is listening port 3000");
});