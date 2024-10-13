import express, { Request, Response } from "express";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

// verify the token
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Password with 6 or more characters is required"
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    // validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // check if a user with the same email already exists
      const user = await UserModel.findOne({ email });
      if (!user) {
        // dont tell the user that the email is not found as it is a security risk
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // check if the password is correct
      // password = request.body.password, user.password = database password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        //  dont tell the user that the password is incorrect as it is a security risk
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // create a token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      // create a cookie
      res.cookie("token", token, {
        httpOnly: true, // only accessible by the server
        secure: process.env.NODE_ENV === "production", // set to true in production
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      });
      // send the response with token to the client
      return res
        .status(200)
        .json({ userId: user._id, message: "Login successful" });
    } catch (error) {
      console.log("🚀 ~ file: auth.ts:56 ~ error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
