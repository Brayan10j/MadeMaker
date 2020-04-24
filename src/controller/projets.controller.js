const Project = require('../models/Project');
const Precio = require('../models/Precio');

const projectCtrl = {};

projectCtrl.agregarProject= async (req, res) => {
    const { title, description ,ancho ,alto ,fondo } = req.body;
    const errors = [];
    if (!title) {
      errors.push({text: 'Escribe un titulo'});
    }
    if (!description) {
      errors.push({text: 'Escribe una descripción'});
    }
    if (!ancho) {
      errors.push({text: 'Digita el ancho'});
    }
    if (!alto) {
      errors.push({text: 'Digita el alto'});
    }
    if (!fondo) {
      errors.push({text: 'Digita el fondo'});
    }
    if (errors.length > 0) {
      res.render('projects/new-project', {
        errors,
        title,
        description
      });
    } else {
      const newProject = new Project({title, description,ancho,alto,fondo});
      newProject.user = req.user.id;
      newProject.EPago = false;
      await newProject.save();
      req.flash('success_msg', 'Proyecto creado!!');
      res.redirect('/projects');
    }
}

projectCtrl.mostrarProjects = async (req, res) => {
    const projects = await Project.find({user: req.user.id}).sort({date: 'desc'});
    res.render('projects/all-projects', { projects });
}

projectCtrl.mostrarProject = async (req, res) => {
    const project = await Project.findById(req.params.id);
    if(project.user != req.user.id) {
      req.flash('error_msg', 'Not Authorized');
      return res.redirect('/projects');
    } 
    res.render('projects/edit-project', { project });
}

projectCtrl.editProject = async (req, res) => {
    const { title, description } = req.body;
    await Project.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Proyecto actualizado!!');
    res.redirect('/projects');
}

projectCtrl.deleteProject = async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (project.EPago) {
      await Precio.findOneAndDelete({project: req.params.id})
      req.flash('success_msg', 'Proyecto eliminado y sus precios!!');
      res.redirect('/projects');
    } else {
      req.flash('success_msg', 'Proyecto eliminado!!');
      res.redirect('/projects');
    }
    
    
}

projectCtrl.adquirirPlan = async (req, res) => {
  const precio = await Precio.findOne({project: req.params.id});
  
  const project = await Project.findById(req.params.id);
  if(project.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/projects');
  } 
  res.render('projects/planes', { precio });
  
}

projectCtrl.enviarProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if(project.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/projects');
  } 
  res.render('projects/project', { project });
}

module.exports = projectCtrl;