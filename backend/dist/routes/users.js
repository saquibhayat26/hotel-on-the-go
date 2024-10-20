import express from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
const router = express.Router();
router.post("/register", [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "password with 6 or more characters is required").isLength({
        min: 6,
    }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        user = new UserModel(req.body);
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24,
        });
        return res.status(200).send({
            message: "User created successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Something went wrong" });
    }
});
export default router;
//# sourceMappingURL=users.js.map