const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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

app.use("/api/plates", (req, res, next) => {
  const carPlates = [
    {
      id: "1",
      name: "First User",
      surname: "First Users surname",
      plateData: "HOO 555"
    },
    {
      id: "2",
      name: "Second User",
      surname: "Second User surname",
      plateData: "LKE 218"
    },
    {
      id: "3",
      name: "Third User",
      surname: "Third User surname",
      plateData: "KEE 023"
    }
  ];
  res.status(200).json({
    carPlates
  });
});

module.exports = app;
