import mongoose from 'mongoose';

const tripDetails = new mongoose.Schema({
  loginTime: {
    type: String, // Alternatively, you can use Date type if you store it as a full Date object
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  tripType: {
    type: String,
    enum: ['Pickup', 'Drop'],
    required: true,
  },
 
  employeeData: {
    type: Array, // Storing employee data as an array
    required: true,
  },
  tripId: {
    type: String,
    required: true,
  }
},{timestamps: true});

const Trips = mongoose.model('Trips', tripDetails);

export default Trips
