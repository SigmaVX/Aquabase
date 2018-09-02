const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportsSchema = new Schema({
  cheaterIGN: { 
    type: String, 
    required: true
  },
  cheatGame:{
    type: Schema.Types.ObjectId,
    ref: 'Games'
  },
  cheatSystem:{
    type: Schema.Types.ObjectId,
    ref: 'Systems'
  },
  cheatType: { 
    type: Schema.Types.ObjectId,
    ref: 'Cheats'
  },
  reportedBy: { 
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  cheatVideo: { 
    type: String 
  },
  cheatComments: { 
    type: String 
  },    
  date: { 
    type: Date,
    default: Date.now()
  }
});

const Reports = mongoose.model("Reports", reportsSchema);

module.exports = Reports;