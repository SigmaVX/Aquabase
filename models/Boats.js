const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boatsSchema = new Schema({
  boatName: { 
    type: String, 
    index: true,
    required: true 
  },
  boatID: { 
    type: String, 
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
    type: [String],
    default: "add-default-to-schema", 
    required: false 
  },
  captains: { 
    type: [String],
    default: "add-default-to-schema", 
    required: false 
  },
  ownedBy: { 
    type: [String],
    default: "add-default-to-schema", 
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

// Inbound Data Should Be Sent As Follows:
// boatName:boat name stuff
// boatID:123
// maxPersons:6
// maxWeight:100
// length:20
// bridgeClearence:50
// beam:75
// propulsion:20
// images:imgageone.jpg
// images:imagetwo.jpg
// captains:captin moe
// captains:cap curly
// ownedBy:joe
// ownedBy:jack
// dockLocation:calamazoo
// builtOnDate:1-10-2010
// lastServiced:2018-06-26T00:39:01.817Z