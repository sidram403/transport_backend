import mongoose from 'mongoose';

const driverDetails = new mongoose.Schema({
  fullName: {
    type: String, // Alternatively, you can use Date type if you store it as a full Date object
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  referedBy: {
    type: String,
    required: true,
  },
  mobileNum:{
    type: String,
    required: true,
  },
  alternateMobileNum:{
    type: String,
    required: true,
  },
  referedPersonMobileNum:{
    type: String,
    required: true,
  },
  vehicleNumber:{
    type: String,
    required: true,
    unique:true
  },
  vehicleType: {
    type: String,
    enum: ['SUV Vehicle', 'Sedan Vehicle'],
    required: true,
  },
 
  file: {
    type: Array, // Storing employee data as an array
    required: true,
    
  },
  
},{timestamps: true});

const Driver = mongoose.model('Driver', driverDetails);

export default Driver
