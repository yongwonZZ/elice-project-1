const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
  Id: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
});

module.exports = categorySchema;