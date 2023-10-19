"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")

require("dotenv").config({ path: __dirname + "/config/.env" });

//Routing
const litableRoute = require("./routes/litable");

//Middlewares
app.use(bodyParser.json())


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE, PATCH');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});  

//Middleware routing
app.use("/litable", litableRoute);


//Handle Route Not found
app.use((req, res, next) => {
  res.status(404).json({
    Ressource: "Route Not found",
  });
});



//Handle Error thrown
app.use((error, req, res, next) => {
  res.status(422).json({
    Ressource: "Not found",
  });
});

//Connect to mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then((connected) => {
    app.listen(3000, () => {
      console.log("Server is listening port 3000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
