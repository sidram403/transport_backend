import express from 'express';
import {  checkTripId,  deleteEmployeeFromTrip,  getAllEmployeeDetails,  getEmployeeDetailsById, getTripDetails, saveActiveTrips, uploadTripDetails } from '../controllers/trips.controller.js';


const router = express.Router()

router.post('/uploadTripDetails', uploadTripDetails)
router.get('/getTripDetails', getTripDetails)
router.post('/getEmployeeDetailsById', getEmployeeDetailsById)
router.get('/getAllEmployeeDetails', getAllEmployeeDetails)
router.post('/checkTripId', checkTripId)
router.post('/deleteEmployeeFromTrip', deleteEmployeeFromTrip)
router.post('/saveActiveTrips', saveActiveTrips)



export default router