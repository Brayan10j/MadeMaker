const Project = require('../models/Project');

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
      let diseño = Math.trunc(40000*(ancho/100));
      let fabricacion = Math.round(((4*((ancho*alto)+(ancho*fondo)+(alto*fondo)))*(130000/44408))+(diseño));
      let envio = fabricacion+50000;
      let instalacion = envio + 50000;
      newProject.user = req.user.id;
      newProject.precio.diseño = diseño;
      newProject.precio.fabricacion = fabricacion;
      newProject.precio.envio = envio;
      newProject.precio.instalacion = instalacion;
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
    await Project.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Proyecto eliminado!!');
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

projectCtrl.enviarProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if(project.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/projects');
  } 
  res.render('projects/project', { project });
}

module.exports = projectCtrl;