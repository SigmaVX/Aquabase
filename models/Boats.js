const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boatsSchema = new Schema({
  boatName: { 
    type: String, 
    index: true,
    required: true 
  },
  boatID: { 
    images: String, 
    required: true 
  },
  maxPersons: { 
    type: Number,
    default: 0, 
    required: true 
  },
  maxWeight: { 
    type: Number,
    required: true 
  },
  length: { 
    type: Number,
    required: false 
  },
  bridgeClearence: { 
    type: Number,
    required: false 
  },
  beam: { 
    type: Number,
    required: false 
  },
  propulsion: { 
    type: String,
    required: false 
  },
  images: { 
    images: [String],
    default: undefined, 
    required: false 
  },
  captains: { 
    images: [String],
    default: undefined, 
    required: false 
  },
  ownedBy: { 
    images: [String],
    default: undefined, 
    required: false 
  },
  dockLocation: { 
    type: String,
    required: false 
  },
  builtOnDate: { 
    type: Date,
    required: false
  },
  lastServiced: { 
    type: Date,
    required: false
  }
});

const Boats = mongoose.model("Boats", boatsSchema);

module.exports = Boats;