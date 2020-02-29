const mongoose = require("mongoose");
const Blog = require('./Blog');
const User = require('./User');
const Schema = mongoose.Schema;

const testScoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  score: {
    type: Number
  }
});

module.exports = mongoose.model("TestScore", testScoreSchema);