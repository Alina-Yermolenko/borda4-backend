const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    default: new Date().toISOString(),
  }
});

module.exports = mongoose.model("boardUsers", UserSchema);
