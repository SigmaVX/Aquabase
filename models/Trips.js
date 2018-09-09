const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripsSchema = new Schema({
  tripName:{
    type: String,
    required: true
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
  crew: { 
    type: String,
    required: false 
  },
  departureLocation: { 
    type: String,
    required: false 
  },
  clients: { 
    type: Array , 
    default: [{
      clientFirstName: {type: String, trim: true},
      clientLastName: {type: String, trim: true},
      clientEmail: {type: String, trim: true},
      clientPhone: {type: String, trim: true},
      groupSize: Number,
      totalAdults: Number,
      totalChildren: Number,
      bookedOn: Date
    }] ,
    required: false
  }
});

const Trips = mongoose.model("Trips", tripsSchema);

module.exports = Reports;