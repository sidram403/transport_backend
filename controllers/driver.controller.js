// controllers/driver.controller.js
import Driver from "../models/driver.model.js";
import Vehicle from "../models/vehicle.model.js";
import { errorHandler } from "../utils/error.js";

export const uploadDriverDetails = async (req, res, next) => {
  try {
    const {
      fullName,
      address,
      referedBy,
      mobileNum,
      alternateMobileNum,
      referedPersonMobileNum,
      vehicleNumber,
      vehicleType,
      file,
    } = req.body;

    // Check if vehicle already exists
    let vehicle = await Vehicle.findOne({ vehicleNumber });
    if (!vehicle) {
      // Create new vehicle if it doesn't exist
      vehicle = new Vehicle({
        vehicleNumber,
        vehicleType,
      });
      await vehicle.save();

      const driverDetails = new Driver({
        fullName,
        address,
        referedBy,
        mobileNum,
        alternateMobileNum,
        referedPersonMobileNum,
        vehicleNumber,
        vehicleType,
        file,
      });

      await driverDetails.save();
      res.status(200).json("Driver Details submitted successfully");
    } else {
      return next(errorHandler(403, "Vehicle number should be unique"));
    }

    // Create driver with the reference to the vehicle
  } catch (error) {
    next(error);
  }
};


export const getAllVehicleDetails = async (req, res, next) => {
  try {
    const vehicleDetails = await Vehicle.find( {},{});
    
    

    return res.status(200).json(vehicleDetails);
  } catch (error) {
    next(error);
  }
};