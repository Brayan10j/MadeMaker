// Models
const User = require('../models/User');

const userCtrl = {};


// Renderisa la vista de registro 
userCtrl.singUp = (req, res) => {
    res.render('users/signup');
  }

// Agrega un usuario
userCtrl.registrerUser = async (req, res) => {
    let errors = [];
    const { name, email, password, confirm_password } = req.body;
    if(password != confirm_password) {
      errors.push({text: 'La contraseña no coincide'});
    }
    if(password.length < 4) {
      errors.push({text: 'La contraseña debe ser mayor a 4 digitos'})
    }
    if(errors.length > 0){
      res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {
      // Look for email coincidence
      const emailUser = await User.findOne({email: email});
      if(emailUser) {
        req.flash('error_msg', 'El correo ya esta en uso');
        res.redirect('/users/signup');
      } else {
        // Saving a New User
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Estas registrado !!');
        res.redirect('/users/signin');
      }
    }
  }  
  


module.exports = userCtrl;

