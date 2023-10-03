"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config({ path: __dirname + "/config/.env" });

//Routing
const rentalRoute = require("./routes/litable");

//Middlewares
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.headers["content-type"]) {
    next();
  }
  throw new Error("Specify content-type to application/json");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//Middleware routing
app.use("/litable", rentalRoute);

//Handle Route Not found
app.use((error, req, res, next) => {
  res.json({
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
