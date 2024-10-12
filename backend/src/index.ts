import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

// connect to the database before we start the server
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

// create an express app
const app = express();

// helps to convert the body of the request into a json object
app.use(express.json());
// helps us to parse the end point of the request
app.use(express.urlencoded({ extended: true }));
// cors is a security things, prevents certain request from being blocked by the browser
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
