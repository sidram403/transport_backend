import mongoose from 'mongoose';

const activeTrips = new mongoose.Schema({
  loginTime: {
    type: String, // Alternatively, you can use Date type if you store it as a full Date object
    required: true,
  },
  TripId: {
    type: String,
    required: true,
  },
  
  vehicleNumber:{
    type: String,
    required: true,
    unique:true
  },
  driverName: {
    type: String,
    required: true,
  },
  driverMobile: {
    type: String,
    required: true,
  },
  escort: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  employeePhone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  pickAddress: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  totalKM: {
    type: String,
    required: true,
  },
 
 
  
  
},{timestamps: true});

const ActiveTrip = mongoose.model('ActiveTrip', activeTrips);

export default ActiveTrip
