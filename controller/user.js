import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import errorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new errorHandler("Invaild Details", 404));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new errorHandler("Invaild Details", 404));
    }

    sendCookies(user, res, `Welcome , ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const newUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return next(new errorHandler("Invaild Details", 404));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookies(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getAllusers = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        user: req.user,
      });
  } catch (error) {
    next(error);
  }
};
