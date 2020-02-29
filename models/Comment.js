const mongoose = require("mongoose");
const Blog = require('./Blog');
const User = require('./User');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
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
  }
})