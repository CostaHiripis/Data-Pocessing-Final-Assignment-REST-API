const validate = require('jsonschema').validate;
const jsonSchemaAirQuality = require('../schemas/air-quality.json');
const jsonSchemaEnergy = require('../schemas/energy.json');
const jsonSchemaPopulation = require('../schemas/population.json')

exports.validateAirQuality = (json) => {
    return validate(json, jsonSchemaAirQuality);
}

exports.validateEnergy = (json) => {
    return validate(json, jsonSchemaEnergy);
}

exports.validatePopulation = (json) => {
    return validate(json, jsonSchemaPopulation);
}
