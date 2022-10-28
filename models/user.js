const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: Date,
    required: true,
    unique: true,
  },
  location: {
    type: Object,
    required: true,
    unique: true,
  },
  picture: {
    type: Object,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", UserSchema, "user");
