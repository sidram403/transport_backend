import Employee from "../models/exployee.model.js";
import Trips from "../models/trips.model.js";

export const uploadTripDetails = async (req, res, next) => {
  try {
    const { loginTime, date, shift, tripType, employeeData, tripId } = req.body;

    const tripsDetails = new Trips({
      loginTime,
      date,
      shift,
      tripType,
      employeeData: employeeData, // Assuming employeeData is sent as a JSON string
      tripId,
    });
    const employeeDetails = new Employee({ employeeData: employeeData });
    await tripsDetails.save();
    await employeeDetails.save();
    res.status(200).send("Trip Details submitted successfully");
  } catch (error) {
    next(error);
  }
};

export const getTripDetails = async (req, res, next) => {
  try {
    const tripDetails = await Trips.find({}, {});
    const tripData = await Promise.all(
      tripDetails.map(async (trip) => {
        return {
          ...trip._doc,
        };
      })
    );

    return res.status(200).json(tripData);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeDetails = async (req, res, next) => {
  try {
    const {tripId} = req.body
    const employeeDetails = await Employee.find( {},{});
    
    const mergedEmployeeData = employeeDetails.reduce((acc, employee) => {
      const filteredEmployeeData = employee.employeeData
        .filter(data => data.tripId === tripId)
        .map(data => ({
          area: data.Area,
          employeeAddress: data["Employee Address"],
          employeeEmergencyContact: data["Employee Emergency contact"],
          employeeId: data["Employee Id"],
          employeeName: data["Employee Name"],
          employeePhone: data["Employee Phone"],
          shiftTime: data["Shift time"],
          shiftType: data["Shift type"],
          tripId: data.tripId
        }));

      return [...acc, ...filteredEmployeeData];
    }, []);

    return res.status(200).json(mergedEmployeeData);
  } catch (error) {
    next(error);
  }
};

export const checkTripId = async (req, res, next) => {
  try {
    const { tripId } = req.body;
    const trip = await Trips.findOne({ tripId });

    if (trip) {
      return res.status(200).json({ isUnique: false });
    } else {
      return res.status(200).json({ isUnique: true });
    }
  } catch (error) {
    next(error)
  }
};



