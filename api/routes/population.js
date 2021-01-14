const express = require('express');
const router = express.Router();

const Population = require('../models/population');

const JSONPopulationController = require('../controllers/populationJSON');
const XMLPopulationController = require('../controllers/populationXML');


//json Routes
router.get('/json', JSONPopulationController.population_get_populations);

router.get('/json/:countryName/:year', JSONPopulationController.population_get_population);

router.post('/json', JSONPopulationController.population_create_population);

router.patch('/json/:countryName/:year', JSONPopulationController.population_patch_population);

router.delete('/json/:countryName/:year', JSONPopulationController.population_delete_population);

//xml Routes
router.get('/xml', XMLPopulationController.population_get_populations);

router.get('/xml/:countryName/:year', XMLPopulationController.population_get_population);

router.post('/xml', XMLPopulationController.population_create_population);

router.patch('/xml/:countryName/:year', XMLPopulationController.population_patch_population);

router.delete('/xml/:countryName/:year', XMLPopulationController.population_delete_population);


module.exports = router;
