import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 4,
  },
  userType: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer",
  },
  profileImage: {
    type: String,
    default: "",
  },
});

const Users = mongoose.model("User", userSchema);
export default Users;
