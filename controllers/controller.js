require("../models");


// Defining Methods For Tables'
// Basic CRUD Method On Top & Custom CRUD Below
module.exports = {
  findAll: function (table, req, res) {
    table
      .find(req.query)
      .sort({ updatedOn: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (table, req, res) {
    table
      .findById(req.params.id)
      .sort({ updatedOn: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (table, req, res) {
    console.log("test ", req.body.images[1]);
    table
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (table, req, res) {
    table
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (table, req, res) {
    // console.log("Delete Request For: ", req.query.id);
    table
      .findById(req.query.id)
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

