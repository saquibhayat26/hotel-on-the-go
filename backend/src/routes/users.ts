import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const router = express.Router();

// /api/users/register
router.post(
  "/register",
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "password with 6 or more characters is required"
    ).isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    // validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check if a user with the same email already exists
      let user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      // encrypt the password

      // create a new user
      user = new UserModel(req.body);
      await user.save();

      // create a token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      // create a cookie
      res.cookie("token", token, {
        httpOnly: true, // only accessible by the server
        secure: process.env.NODE_ENV === "production", // only send the cookie over https
        maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
      });

      // send the response with token to the client
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
