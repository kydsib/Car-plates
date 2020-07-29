const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const CarPlate = require("./models/plate");

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/plates", (req, res, next) => {
  // mongoose model gives the constructor function
  const plate = new CarPlate({
    name: req.body.name,
    surname: req.body.surname,
    plateData: req.body.plateData
  });
  // save is provided by mongoose
  plate.save().then(newCarPlate => {
    res.status(201).json({
      carPlateId: newCarPlate._id
    });
  });
});

app.get("/api/plates", (req, res, next) => {
  // mongoose provided method, that returns all entries
  CarPlate.find().then(documents => {
    // waiting while data is being fetched
    res.status(200).json({
      carPlates: documents
    });
  });
});

app.delete("/api/plates/:id", (req, res, next) => {
  CarPlate.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json();
  });
});

module.exports = app;
