import express from 'express';
import { getAllVehicleDetails, getDetailsByVehicleNumber,  uploadDriverDetails } from '../controllers/driver.controller.js';


const router = express.Router()

router.post('/uploadDriverDetails', uploadDriverDetails)
router.get('/getAllVehicleDetails', getAllVehicleDetails)
router.post('/getDetailsByVehicleNumber', getDetailsByVehicleNumber)



export default router