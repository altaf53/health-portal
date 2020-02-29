const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    
  },
  emailId: {
    type: String,
    
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