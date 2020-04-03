const express = require('express');
const router = express.Router();

// Models
const Project = require('../models/Project');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// New Project
router.get('/projects/add', isAuthenticated, (req, res) => {
  res.render('projects/new-project');
});

router.post('projects/new-project', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({text: 'Please Write a Title.'});
  }
  if (!description) {
    errors.push({text: 'Please Write a Description'});
  }
  if (errors.length > 0) {
    res.render('projects/new-project', {
      errors,
      title,
      description
    });
  } else {
    const newProject = new Project({title, description});
    newProject.user = req.user.id;
    await newProject.save();
    req.flash('success_msg', 'Project Added Successfully');
    res.redirect('/projects');
  }
});

// Get All Projects
router.get('/projects', isAuthenticated, async (req, res) => {
  const projects = await Project.find({user: req.user.id}).sort({date: 'desc'});
  res.render('projects/all-projects', { projects });
});

// Edit Projects
router.get('/projects/edit/:id', isAuthenticated, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if(project.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/projects');
  } 
  res.render('projects/edit-project', { project });
});

router.put('/projects/edit-project/:id', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Project.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg', 'Project Updated Successfully');
  res.redirect('/projects');
});

// Delete Projects
router.delete('/projects/delete/:id', isAuthenticated, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Project Deleted Successfully');
  res.redirect('/projects');
});

module.exports = router;
