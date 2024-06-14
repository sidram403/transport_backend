import mongoose from 'mongoose';

const vehicleDetails = new mongoose.Schema({
  vehicleNumber: {
    type: String, // Alternatively, you can use Date type if you store it as a full Date object
    required: true,
    unique: true,
  },
  
  vehicleType: {
    type: String,
    required: true,
  },
  
},{timestamps: true});

const Vehicle = mongoose.model('Vehicle', vehicleDetails);

export default Vehicle
