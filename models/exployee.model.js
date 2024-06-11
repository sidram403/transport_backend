import mongoose from 'mongoose';

const employeeDetails = new mongoose.Schema({
  
 
  
  employeeData: {
    type: Array, // Storing employee data as an array
    required: true,
  },
  
}, {timestamps: true});

const Employee = mongoose.model('Employee', employeeDetails);

export default Employee
