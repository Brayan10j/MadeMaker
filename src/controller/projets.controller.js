const Project = require('../models/Project');

const projectCtrl = {};

projectCtrl.agregarProject= async (req, res) => {
    const { title, description ,ancho ,alto ,fondo } = req.body;
    const errors = [];
    if (!title) {
      errors.push({text: 'Please Write a Title.'});
    }
    if (!description) {
      errors.push({text: 'Please Write a Description'});
    }
    if (!ancho) {
      errors.push({text: 'Digita las dimensiones'});
    }
    if (!alto) {
      errors.push({text: 'Digita las dimensiones'});
    }
    if (!fondo) {
      errors.push({text: 'Digita las dimensiones'});
    }
    if (errors.length > 0) {
      res.render('projects/new-project', {
        errors,
        title,
        description
      });
    } else {
      const newProject = new Project({title, description,ancho,alto,fondo});
      let diseño = Math.trunc(40000*(ancho/100));
      let fabricacion = Math.round10(((4*((ancho*alto)+(ancho*fondo)+(alto*fondo)))*(130000/44408))+(diseño));
      let envio = fabricacion+50000;
      let instalacion = envio + 50000;
      newProject.user = req.user.id;
      newProject.precio.diseño = diseño;
      newProject.precio.fabricacion = fabricacion;
      newProject.precio.envio = envio;
      newProject.precio.instalacion = instalacion;
      await newProject.save();
      req.flash('success_msg', 'Project Added Successfully');
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
    req.flash('success_msg', 'Project Updated Successfully');
    res.redirect('/projects');
}

projectCtrl.deleteProject = async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Project Deleted Successfully');
    res.redirect('/projects');
}

projectCtrl.adquirirPlan = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if(project.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/projects');
  } 
  res.render('projects/planes', { project });
}

module.exports = projectCtrl;