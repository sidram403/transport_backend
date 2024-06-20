import Admin from "../models/admin.model.js";
import { errorHandler } from "../utils/error.js";

export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    let validUser = await Admin.findOne({ username });

    let validPassword;
    if (validUser._doc.role === "admin") {
      validPassword = await Admin.findOne({ password });
    }
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    return res.status(200).json(validUser);

  } catch (error) {
    next(error);
  }
};
