const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const carPlatesRoutes = require("./routes/car-plates");

const app = express();
mongoose
  .connect(
    "mongodb+srv://sim:anPW1UV3HMyXfeKw@cluster0.uvbop.mongodb.net/car-plates?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // this allows app to access resources when servers are different
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // controling which HTTP words are used to send requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/plates", carPlatesRoutes);

module.exports = app;
