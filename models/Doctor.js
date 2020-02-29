const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  mobileNo: {
    type: Number
  },
  field: {
    type: String
  },
  gender: {
    type: String,
    enum: ['M', 'F']
  }
}) 