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
    type: String,
    required: true
  },
  alto: {
    type: Number,
    
  },
  fondo: {
    type: Number,
    
  },
  precio: {
    type: Number,
    
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