const express = require('express');
const router = express.Router();

const AirQuality = require('../models/air-quality');

const JSONAirQualityController = require('../controllers/air-qualityJSON');
const XMLAirQualityController = require('../controllers/air-qualityXML');


//json Routes
router.get('/json', JSONAirQualityController.airQuality_get_airQualities);

router.get('/json/:countryName/:year', JSONAirQualityController.airQuality_get_airQuality);

router.post('/json', JSONAirQualityController.airQuality_create_airQuality);

router.patch('/json/:countryName/:year', JSONAirQualityController.airQuality_patch_airQuality);

router.delete('/json/:countryName/:year', JSONAirQualityController.airQuality_delete_airQuality);

//xml Routes
router.get('/xml', XMLAirQualityController.airQuality_get_airQualities);

router.get('/xml/:countryName/:year', XMLAirQualityController.airQuality_get_airQuality);

router.post('/xml', XMLAirQualityController.airQuality_create_airQuality);

router.patch('/xml/:countryName/:year', XMLAirQualityController.airQuality_patch_airQuality);

router.delete('/xml/:countryName/:year', XMLAirQualityController.airQuality_delete_airQuality);


module.exports = router;
