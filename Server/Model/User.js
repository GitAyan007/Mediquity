const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["User", "Doctor"],
    default: "User",
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "File",
    },
  ],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Appointment",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
