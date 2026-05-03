import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Validation middleware
const validateSignup = [
  body("firstname")
    .trim()
    .notEmpty().withMessage("First name is required"),
  body("lastname")
    .trim()
    .notEmpty().withMessage("Last name is required"),
  body("email")
    .trim()
    .isEmail().withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number"),
];

router.post("/signup", validateSignup, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: errors.array()[0].msg,
        success: false,
      });
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.send({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).send({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.send({
        message: "No account found with this email",
        success: false,
      });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.send({ message: "Incorrect Password", success: false });
    }

    // Update online status
    user.isOnline = true;
    await user.save();

    const authToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.send({ message: "login Successful", success: true, token: authToken });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      await User.findByIdAndUpdate(decoded.userId, {
        isOnline: false,
        lastSeen: new Date(),
      });
    }
    res.send({ message: "Logged out", success: true });
  } catch {
    res.send({ message: "Logout successful", success: true });
  }
});

export default router;