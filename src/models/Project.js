const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  
  ancho: {
    type: Number,
    required: true
  },
  alto: {
    type: Number,
    required: true
  },
  fondo: {
    type: Number,
    required: true
  },
  EPago:{
    type: Boolean
  },
  user: {
    type: String,
    required: true
  },
  model: {
      type : String,

  }
});

module.exports = mongoose.model('Project', ProjectSchema);