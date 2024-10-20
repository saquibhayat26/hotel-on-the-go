import express from "express";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth.js";
const router = express.Router();
router.get("/validate-token", verifyToken, (req, res) => {
    res.status(200).send({ userId: req.userId });
});
router.post("/logout", (req, res) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.status(200).send({ message: "Logged out successfully" });
});
router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters is required").isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res
            .status(200)
            .json({ userId: user._id, message: "Login successful" });
    }
    catch (error) {
        console.log("🚀 ~ file: auth.ts:56 ~ error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
export default router;
//# sourceMappingURL=auth.js.map