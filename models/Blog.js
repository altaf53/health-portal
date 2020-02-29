const mongoose = require("mongoose");
const User = require('./User');
const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
  title: {
    type: String
  },
  tags: [{
    type: String
  }],
  description: {
    type: String
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  user_type: {
    type: String,
    enum: ['user', 'doctor']
  }
});

module.exports = mongoose.model("Blog", blogSchema);