const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripsSchema = new Schema({
  tripName:{
    type: String,
    required: true
  },
  tripStatus:{
    type: String,
    default: "Pending"
  },
  itinerary:{
    type: String,
    required: true
  },
  tripDateTime: { 
    type: Date,
    index: true, 
    required: true
  },
  duration:{
    type: Number,
    required: true
  },
  boat:{
    type: Schema.Types.ObjectId,
    ref: 'Boats',
    required: true
  },
  maxPassengers:{
    type: Number,
    required: true
  },
  currentPassengers:{
    type: Number,
    default: 0,
    required: true
  },
  charterType:{
    type: String,
    required: false
  },
  crew: [{ 
    type: [Schema.Types.ObjectId],
    ref: 'Users',
  }],
  departureLocation: { 
    type: String,
    required: false 
  },
  clients: [{
      clientFirstName: {type: String, trim: true},
      clientLastName: {type: String, trim: true},
      clientEmail: {type: String, trim: true},
      clientPhone: {type: String, trim: true},
      groupSize: Number,
      totalAdults: Number,
      totalChildren: Number,
      bookedOn: Date
    }]
});

const Trips = mongoose.model("Trips", tripsSchema);

module.exports = Trips;

// Inbound Data Should Be Sent As Follows:
// {
//   "tripName":"island trip",
//     "tripStatus": "Completed",
//   "itinerary":"stopping here and there",
//   "tripDateTime":"10-10-2018",
//   "duration":3.5,
//   "boat":"5b9ebb54b7778b2f7ca51ac5",
//   "maxPassengers":5,
//   "currentPassengers":3,
//   "charterType":"SCUBA",
//   "crew":["5b9ef01151f6675ddcfff48c", "5b9ef01151f6675ddcfff48c"],
//   "departureLocation":"my house",
//   "clients": {
//         "clientFirstName":"Joe",
//         "clientLastName":"Dirt",
//         "clientEmail":"123234@123.com",
//         "clientPhone":"555-555-5555",
//         "groupSize":5,
//         "totalAdults":3,
//         "totalChildren":2,
//         "bookedOn":"10-10-2018"
//         }
//   }