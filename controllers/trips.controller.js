import Employee from "../models/exployee.model.js";
import Trips from "../models/trips.model.js";

export const uploadTripDetails = async (req, res, next) => {
  try {
    const { loginTime, date, shift, tripType, employeeData, tripId } = req.body;

    const employeeDetailsArray = employeeData.map((employee) => ({
      ...employee,
      loginTime,
    }));

    const tripsDetails = new Trips({
      loginTime,
      date,
      shift,
      tripType,
      employeeData: employeeDetailsArray, // Assuming employeeData is sent as a JSON string
      tripId,
    });

    const employeeDetails = new Employee({
      tripId: tripId,
      employeeData: employeeDetailsArray,
    });
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

export const getEmployeeDetailsById = async (req, res, next) => {
  try {
    const { tripId } = req.body;
    const employeeDetails = await Employee.find({}, {});

    const mergedEmployeeData = employeeDetails.reduce((acc, employee) => {
      const filteredEmployeeData = employee.employeeData
        .filter((data) => data.tripId === tripId)
        .map((data) => ({
          area: data.Area,
          employeeAddress: data["Employee Address"],
          employeeEmergencyContact: data["Employee Emergency contact"],
          employeeId: data["Employee Id"],
          employeeName: data["Employee Name"],
          employeePhone: data["Employee Phone"],
          shiftTime: data["Shift time"],
          shiftType: data["Shift type"],
          gender: data["Gender"],
          tripId: data.tripId,
          loginTime: data.loginTime,
        }));

      return [...acc, ...filteredEmployeeData];
    }, []);

    return res.status(200).json(mergedEmployeeData);
  } catch (error) {
    next(error);
  }
};

export const getAllEmployeeDetails = async (req, res, next) => {
  try {
    const employeeDetails = await Employee.find({}, {});

    const mergedEmployeeData = employeeDetails.reduce((acc, employee) => {
      const transformedEmployeeData = employee.employeeData.map((data) => ({
        area: data.Area,
        employeeAddress: data["Employee Address"],
        employeeEmergencyContact: data["Employee Emergency contact"],
        employeeId: data["Employee Id"],
        employeeName: data["Employee Name"],
        employeePhone: data["Employee Phone"],
        shiftTime: data["Shift time"],
        shiftType: data["Shift type"],
        gender: data["Gender"],
        tripId: data.tripId,
        loginTime: data.loginTime,
      }));

      return [...acc, ...transformedEmployeeData];
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
    next(error);
  }
};

export const deleteEmployeeFromTrip = async (req, res, next) => {
  const { tripId, employeeId } = req.body;

  try {
    const trip = await Trips.findOne({ tripId });

    if (trip) {
      const employeeIndex = trip.employeeData.findIndex(
        (emp) => emp["Employee Id"] === employeeId
      );

      if (employeeIndex === -1) {
        return res.status(404).json({ msg: "Employee not found in trip" });
      }

      trip.employeeData.splice(employeeIndex, 1);

      await trip.save();
    }
    if (!trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }

    const employee = await Employee.findOne({ tripId });

    if (employee) {
      const employeeIndex = employee.employeeData.findIndex(
        (emp) => emp["Employee Id"] === employeeId
      );

      if (employeeIndex === -1) {
        return res.status(404).json({ msg: "Employee not found in trip" });
      }

      employee.employeeData.splice(employeeIndex, 1);

      await employee.save();
    }
    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    return res.status(200).json("Trip Deleted successfully");
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
};
