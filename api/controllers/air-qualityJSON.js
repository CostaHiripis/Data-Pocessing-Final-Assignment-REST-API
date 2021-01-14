const AirQuality = require('../models/air-quality');
const mongoose = require('mongoose');
const jsonValidator = require('../validators/jsonValidator');

exports.airQuality_get_airQualities = (req, res) => {

    AirQuality.find()
    .select('countryName polutant variable year unit value -_id')
    .exec()
    .then(results => {

        const response = {
            airQuality: results.map(result => {
                return {
                    country: {
                        countryName: result.countryName,
                        polutant: result.polutant,
                        variable: result.variable,
                        year: result.year,
                        unit: result.unit,
                        value: result.value,
                    },
                    message: "Air Quality returned sucessfully"
                }
            })
        }

        if(jsonValidator.validateAirQuality(response).valid) {
            
            res.status(200);
            res.send(response);

        } else {
            
            const response = {
                message: "Air Quality does not match the schema"
            }

            res.status(422);
            res.send(response);
            
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
           error: err
        });
    })
}

exports.airQuality_create_airQuality = (req, res) => {


    if(jsonValidator.validateAirQuality(req.body).valid)
    {
        for (airQualities of req.body.airQuality) {

            const airQuality = new AirQuality({
                _id: new mongoose.Types.ObjectId(),
                countryName: airQualities.country.countryName,
                polutant: airQualities.country.polutant,
                variable: airQualities.country.variable,
                year: airQualities.country.year,
                unit: airQualities.country.unit,
                value: airQualities.country.value
            });
            
            console.log(airQuality);
    
            airQuality
            .save()
            .then(result => {
                const response = {
                    airQuality: {
                        country: {
                            countryName: result.countryName,
                            polutant: result.polutant,
                            variable: result.variable,
                            year: result.year,
                            unit: result.unit,
                            value: result.value
                        },
                        message: "Air Quality created sucessfully"
                    }

                }

                res.send(response);
                res.status(201);

            })
            .catch(err => {
                if (err.code == 11000) {
                    const response = {
                        message: "The Air Quality you are trying to create already exists"
                    }
                    
                    res.status(303);
                    res.send(response);
                } else {
                    const response = {
                        message : err
                    }
                    res.status(500);
                    res.send(response);
                }
            });
        }
    } else {
        const response = {
            message: "Air Quality does not match the schema"
        }

        res.status(422);
        res.send(response);
    }
}

exports.airQuality_get_airQuality = (req, res) => {

    const airQuality = new AirQuality({
        countryName: req.params.countryName,
        year: req.params.year
    });

    AirQuality.find(airQuality)
    .select('countryName polutant variable year unit value -_id')
    .exec()
    .then(results => {
        
        if (results.length == 1) {

            const response = {
                airQuality: results.map(result => {
                    return {
                        country: {
                            countryName: result.countryName,
                            polutant: result.polutant,
                            variable: result.variable,
                            year: result.year,
                            unit: result.unit,
                            value: result.value,
                        },
                        message: "Air Quality returned sucessfully"
                    }
                })
            }
            
            if(jsonValidator.validateAirQuality(response).valid) {
            
                res.status(200);
                res.send(response);
    
            } else {
                
                const response = {
                    message: "Air Quality does not match the schema"
                }
    
                res.status(422);
                res.send(response);
                
            }
            
        } else {
            res.status(404).json({
                message: 'No valid Air Quality found for provided parameters'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.airQuality_patch_airQuality = (req, res) => {

    if(jsonValidator.validateAirQuality(req.body).valid)
    {

        const airQuality = new AirQuality({
            countryName: req.params.countryName,
            year: req.params.year
        });

        for (airQualities of req.body.airQuality) {

            const newAirQuality = new AirQuality({
                countryName: airQualities.country.countryName,
                polutant: airQualities.country.polutant,
                variable: airQualities.country.variable,
                year: airQualities.country.year,
                unit: airQualities.country.unit,
                value: airQualities.country.value
            });
    
            AirQuality.updateOne(airQuality, {$set: newAirQuality})
            .exec()
            .then(result => {
                if(result.nModified == 1)
                {
                    const response = {
                        message: 'Air Quality updated'
                    }

                    res.status(200);
                    res.send(response);

                } else {

                    res.status(404).json({
                        message: 'No valid Air Quality found for provided parameters',
                    });

                }
            })
            .catch(err => {
                if (err.code == 11000) {
                    const response = {
                        message: "The Air Quality you are trying to update already exists",
                    }
                    res.status(303);
                    res.send(response);
                } else {
                    const response = {
                        message : err
                    }
                    res.status(500);
                    res.send(response);
                }
            });
        }
    } else {
        const response = {
            message: "Air Quality does not match the schema"
        }

        res.status(422);
        res.send(response);
    } 
}

exports.airQuality_delete_airQuality = (req, res) => {

    const airQuality = new AirQuality({
        countryName: req.params.countryName,
        year: req.params.year
    });

    AirQuality.deleteOne(airQuality)
    .exec()
    .then(result => {
        if(result.deletedCount == 1)
        {
            const response = {
                message: 'Air Quality deleted'
            }
            res.status(200);
            res.send(response);
        } else {
            res.status(404).json({
                message: 'No valid Air Quality found for provided parameters',
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}