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

export const getDetailsByVehicleNumber = async (req, res, next) => {
  let { vehicleNumbers } = req.body;

  // Ensure vehicleNumbers is an array
  if (!Array.isArray(vehicleNumbers)) {
    vehicleNumbers = [vehicleNumbers];
  }

  // Initialize an array to hold promises for finding each driver
  const driverPromises = vehicleNumbers.map(vehicleNumber =>
    Driver.findOne({ vehicleNumber }).exec()
  );

  try {
    // Resolve all promises
    const drivers = await Promise.all(driverPromises);

    // Filter out null values (in case no driver was found for some vehicle numbers)
    const driverDetailsArray = drivers.filter(driver => driver !== null).map(driver => driver._doc);

    if (driverDetailsArray.length === 0) {
      return res.status(404).json({ msg: 'No driver details found for the provided vehicle numbers' });
    }

    return res.status(200).json(driverDetailsArray);
  } catch (error) {
    next(error);
  }
};
