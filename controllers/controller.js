require("../models");

// Defining methods for the Tilt's Tables' Controllers
module.exports = {
  findAll: function (table, req, res) {
    table
      .find(req.query)
      .sort({ date: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllReports:function (table, req, res) {
    table
      .find(req.query)
      .populate("cheatGame")
      .populate("cheatSystem")
      .populate("cheatType")
      .sort({ date: 1 })
      .limit(10 )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllBySort: function (table, req, res, sortKey) {
    table
      .find(req.query)
      .sort({ [sortKey]: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (table, req, res) {
    table
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByTime: function (table, req, res) {
    console.log("Query Times Requested: ", req.query);

    table
      .find({date: {
        $gte: new Date(req.query.yesterday)
      }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByIGN: function (table, req, res) {
    // console.log("Req Params Are: ", req.query);
    // console.log("Searching For: ", req.query.cheaterIGN);
    const searchTerm = req.query.cheaterIGN;
    // const searchString = "/"+ searchTerm +"/i";
    // console.log("Search String Is: ", searchString);

    // Splits Term To Account For White Spaces In IGN
    var terms = searchTerm.split(' ');
    var regexString = "";

    // Loop To Build Seperate Searchs For Each Term In Search String
    for (var i = 0; i < terms.length; i++){
        regexString += terms[i];
        if (i < terms.length - 1) regexString += '|';
    }

    // Saves New Regex For Multiple Terms
    var newSearchTerm = new RegExp(regexString, 'ig');

    table
      // .find({cheaterIGN : { "$regex": searchTerm, "$options": "ix" }})
      .find({cheaterIGN : { "$regex": newSearchTerm, "$options": "ix" }})
      .populate("cheatGame")
      .populate("cheatSystem")
      .populate("cheatType")
      .sort({ cheatSystem: 1 })
      .then(dbModel => {
        // console.log(dbModel);  
        res.json(dbModel);
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });
  },
  findByForum: function(table, req, res) {
		let forumId = req.params.id;
    table
		  // Find all chats
		  .findById(forumId)
		  // Specify that we want to populate the retrieved forum with any associated chats
      .populate("chats")
      // .limit(20 )
			.then(function(forumchatData) {
				// If no data were found, send back a 404
				if (!forumchatData) res.status(404).end();

				// If able to successfully find and associate forum and chats, send back to client
				res.json(forumchatData);
			})
			.catch(function(err) {
				// If an error occurs, send it back to the client
				res.json(err);
			});
  },
  create: function (table, req, res) {
    table
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createItem: function(table, table2, req, res) {
    table
      .create(req.body)
      .then(function(dbChat) {
        // If a chat was created successfully, find the associated Forum and push the new Chat's _id 
        // to the Forum's `notes` array
        // { new: true } tells the query that we want it to return the updated Chat -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        // console.log(`dbChat: ${dbChat}`)
        return table2.findOneAndUpdate({_id: req.params.id}, { $push: { chats: dbChat._id } }, { new: true });
      })
      .then(function(dbForum) {
        // If the Forum was updated successfully, send it back to the client
        res.json(dbForum);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
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
  },
  removeItemById: function(table, req, res) {
    const itemId = req.params.id;
    table
      .findByIdAndRemove(itemId, function (err) {
        if (err) throw err;
        console.log("item deleted in /api/table/:id route");
      res.end();
      });
  }
};

