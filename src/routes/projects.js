const express = require('express');
const router = express.Router();
const projectCtrl = require('../controller/projets.controller');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// route para crear el boceto del mueble
router.get('/projects/project/:id', isAuthenticated, projectCtrl.enviarProject);

router.get('/projects/planes/:id', isAuthenticated ,projectCtrl.adquirirPlan);

// New Project
router.get('/projects/add', isAuthenticated, (req, res) => {
  res.render('projects/new-project');
});

router.post('/projects/new-project', isAuthenticated, projectCtrl.agregarProject );

// Get All Projects
router.get('/projects', isAuthenticated, projectCtrl.mostrarProjects);

// Edit Projects
router.get('/projects/edit/:id', isAuthenticated, projectCtrl.mostrarProject );

router.put('/projects/edit-project/:id', isAuthenticated, projectCtrl.editProject );

// Delete Projects
router.delete('/projects/delete/:id', isAuthenticated, projectCtrl.deleteProject );

module.exports = router;
