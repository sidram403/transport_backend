import mongoose from 'mongoose';

const employeeDetails = new mongoose.Schema({
  
  tripId:{
    type: String,
    required: true,
    unique: true,
  },
  
  employeeData: {
    type: Array, // Storing employee data as an array
    required: true,
  },
  
}, {timestamps: true});

const Employee = mongoose.model('Employee', employeeDetails);

export default Employee
