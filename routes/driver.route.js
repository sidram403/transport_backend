import express from 'express';
import { getAllVehicleDetails, uploadDriverDetails } from '../controllers/driver.controller.js';


const router = express.Router()

router.post('/uploadDriverDetails', uploadDriverDetails)
router.get('/getAllVehicleDetails', getAllVehicleDetails)



export default router