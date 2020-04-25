const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Precio = require('../models/Precio');

// Helpers
const { isAuthenticated } = require('../helpers/auth');


router.get('/adminXa',(req, res) => {
  
  res.render('admin/admin');
});

router.post('/adminXa', async (req, res) => {
    const  {x ,idP} = req.body

    try {
      const project = await Project.findById(idP);
      
      res.render('admin/admin', { project });

    } catch (error) {
      req.flash('error_msg', 'El proyecto no existe');
      res.redirect('/adminXa');
      
      
      
    }    
});

router.put('/adminXa/precios/:id', async (req, res) => {
  
  const { dis, fabricacion, envio, instalacion } = req.body; 
  const existe = await Precio.findOne({project: req.params.id});
  console.log(existe);
  if (existe) {
    console.log("ya existe");
    req.flash('error_msg', 'El precio del proyecto ya fue asignado');
    res.redirect('/adminXa');

  } else {
    const newPrecio = new Precio({ dis, fabricacion, envio, instalacion });
    newPrecio.project = req.params.id;
    await newPrecio.save();
    try {
      await Project.findOneAndUpdate({_id:req.params.id}, {EPago: true}  );
    } catch (error) {
      console.log(" no se actualizo el epago" , error)
    }
    
    
      
      
    req.flash('success_msg', 'Precio creado!!');
    res.redirect('/adminXa');
  }
    
  
    
      
});



module.exports = router;
