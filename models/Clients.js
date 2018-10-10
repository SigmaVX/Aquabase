const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Client Array - Shoud Have Objects Formatted As
// { clientName: XX, clientEmail: XX, clientPhone: XX, groupSize: XX, bookedOn: XX}


const clientsSchema = new Schema({
  firstName: { 
    type: String,
    trim: true, 
    required: true
  },
  lastName: { 
    type: String,
    index: true,
    trim: true, 
    required: true
  },
  addressOne: {
    type: String, 
    required: false,
  },
  addressTwo: {
    type: String, 
    required: false,
  },
  city: {
    type: String, 
    required: false,
  },
  state: {
    type: String, 
    required: false,
  },
  zipcode: {
    type: String, 
    required: false,
  },
  email: { 
    type: String, 
    required: true
  },
  clientPhone: { 
    type: String, 
    required: true
  },
  // trips: [{ 
  //   type: Array, 
  //   default: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'Trips'
  //   }],
  trips: { 
    type: [Schema.Types.ObjectId],
    ref: 'Trips',
    required: true
  }
});

const Clients = mongoose.model("Clients", clientsSchema);

module.exports = Clients;


  // Inbound Data Should Be Sent As Follows:
  // {
  //   "firstName": "Tony", 
  //   "lastName": "Wible",
  //   "addressOne": "8 Spring Hunter Ct",
  //   "addressTwo": "",
  //   "city": "Andover",
  //   "state": "NJ",
  //   "zipcode": "07821",
  //   "email": "tony@123.com",
  //   "clientPhone": "908 852 6107",
  //   "trips": ["5ba12eb4439e0e541c7d2bec", "5ba12eb4439e0e541c7d2bec"]
  // }