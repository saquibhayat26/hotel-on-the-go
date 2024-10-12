import Mongoose from "mongoose";
import bcrypt from "bcryptjs";

// create a type that represents a user
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// create a schema for the user
const userSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// encrypt the password before saving it to the database, this is a middleware of mongodb
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// create a model for the user
const UserModel = Mongoose.model<UserType>("User", userSchema);
export default UserModel;
