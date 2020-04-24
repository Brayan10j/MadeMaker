const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  
  
  project: {
    type: String,
    required: true
  },
  diseño: {
    type: Number,
    required: true
  },
  fabricacion: {
    type: Number,
    required: true
  },
  envio: {
    type: Number,
    required: true
  },
  instalacion:{
    type: Number,
    required: true
  }
  

  
});

module.exports = mongoose.model('Precio', ProjectSchema);