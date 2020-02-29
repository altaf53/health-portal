const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  emailId: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    enum: ['M', 'F']
  },
  tags: [{
    type: String
  }],
  diagonsedWith: {
    type: String
  },
  mobileNo: {
    type: Number
  },
  imagePath: {
    type: String
  },
  dateOfRegistration: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("User", userSchema);