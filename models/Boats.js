const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boatsSchema = new Schema({
  boatName: { 
    type: String, 
    required: true 
  },
  maxCapacity: { 
    type: Number,
    default: 0, 
    required: true 
  },
  maxWeight: { 
    type: Number,
    required: false 
  },
  location: { 
    type: String,
    required: false 
  },
  boatSize: { 
    type: Number,
    required: false 
  },
  boatImages: { 
    images: [String],
    default: undefined, 
    required: false 
  },
  boatCaptains: { 
    images: [String],
    default: undefined, 
    required: false 
  },
  builtOnDate: { 
    type: Date,
    required: false
  }
});

const Boats = mongoose.model("Boats", systemsSchema);

module.exports = Boats;