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
  precio:{
    diseño: Number,
    fabricacion: Number,
    envio: Number,
    instalacion:Number
  },
  ancho: {
    type: String,
    
  },
  alto: {
    type: Number,
    
  },
  fondo: {
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