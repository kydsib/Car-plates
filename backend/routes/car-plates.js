const express = require("express");
const CarPlate = require("../models/plate");

const router = express.Router();

router.post("", (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
  const newPlateData = new CarPlate({
    _id: req.body._id,
    name: req.body.name,
    surname: req.body.surname,
    plateData: req.body.plateData
  });
  CarPlate.updateOne({ _id: req.params.id }, newPlateData).then(result => {
    res.status(200).json();
  });
});

router.get("", (req, res, next) => {
  // using + to convert string number values to numbers
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const plateQuery = CarPlate.find();
  let fetchedPlates;
  if (pageSize && currentPage) {
    plateQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  // mongoose provided method, that returns all entries
  plateQuery
    .then(documents => {
      fetchedPlates = documents;
      return CarPlate.count();
    })
    .then(count => {
      const sortedAlphabetically = fetchedPlates.sort(function(a, b) {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      });

      // waiting while data is being fetched
      res.status(200).json({
        carPlates: sortedAlphabetically,
        totalPlateCount: count
      });
    });
});

router.get("/:id", (req, res, next) => {
  CarPlate.findById(req.params.id).then(plate => {
    if (plate) {
      res.status(200).json(plate);
    } else {
      res.status(404).json();
    }
  });
});

router.delete("/:id", (req, res, next) => {
  CarPlate.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json();
  });
});

module.exports = router;
