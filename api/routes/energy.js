const express = require('express');
const router = express.Router();

const Energy = require('../models/air-quality');

const JSONEnergyController = require('../controllers/energyJSON');
const XMLEnergyController = require('../controllers/energyXML');


//json Routes
router.get('/json', JSONEnergyController.energy_get_energies);

router.get('/json/:countryName/:year', JSONEnergyController.energy_get_energy);

router.post('/json', JSONEnergyController.energy_create_energy);

router.patch('/json/:countryName/:year', JSONEnergyController.energy_patch_energy);

router.delete('/json/:countryName/:year', JSONEnergyController.energy_delete_energy);

//xml Routes
router.get('/xml', XMLEnergyController.energy_get_energies);

router.get('/xml/:countryName/:year', XMLEnergyController.energy_get_energy);

router.post('/xml', XMLEnergyController.energy_create_energy);

router.patch('/xml/:countryName/:year', XMLEnergyController.energy_patch_energy);

router.delete('/xml/:countryName/:year', XMLEnergyController.energy_delete_energy);


module.exports = router;
