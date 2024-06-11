import express from 'express';
import { checkTripId, getEmployeeDetails, getTripDetails, uploadTripDetails } from '../controllers/trips.controller.js';


const router = express.Router()

router.post('/uploadTripDetails', uploadTripDetails)
router.get('/getTripDetails', getTripDetails)
router.post('/getEmployeeDetails', getEmployeeDetails)
router.post('/checkTripId', checkTripId)



export default router