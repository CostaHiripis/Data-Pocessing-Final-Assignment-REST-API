const AirQuality = require('../models/air-quality');
const mongoose = require('mongoose');
const json2xml = require('../json2xml/json2xml');
const xmlValidator = require('../validators/jsonValidator');

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

        if(xmlValidator.validateAirQuality(response).valid) {
            
            res.status(200);
            res.send(json2xml.json2xml(response));

        } else {
            
            const response = {
                message: "Air Quality does not match the schema"
            }

            res.status(422);
            res.send(json2xml.json2xml(response));
            
        }
    })
    .catch(err => {
        const response = {
            message: err
        }
        res.send(json2xml.json2xml(response));
    })
}

exports.airQuality_create_airQuality = (req, res) => {

    for (countries of req.body.airQuality.country) {

        var countryNameWithExtraChars = countries.countryName.toString();
        var nameWithoutExtraChars = countryNameWithExtraChars.replace("[ ", "").replace(" ]", "");

        var polutantWithExtraChars = countries.polutant.toString();
        var polutantWithoutExtraChars = polutantWithExtraChars.replace("[ ", "").replace(" ]", "");

        var variableWithExtraChars = countries.variable.toString();
        var variableWithoutExtraChars = variableWithExtraChars.replace("[ ", "").replace(" ]", "");

        var yearWithExtraChars = countries.year.toString();
        var yearWithoutExtraChars = yearWithExtraChars.replace("[ ", "").replace(" ]", "");

        var unitWithExtraChars= countries.unit.toString();
        var unitWithoutExtraChars= unitWithExtraChars.replace("[ ", "").replace(" ]", "");

        var valueWithExtraChars = countries.value.toString();
        var valueWithoutExtraChars = valueWithExtraChars.replace("[ ", "").replace(" ]", "");

        const request = {
            airQuality: [
                {
                    country: {
                    countryName: nameWithoutExtraChars,
                    polutant: polutantWithoutExtraChars,
                    variable: variableWithoutExtraChars,
                    year: yearWithoutExtraChars,
                    unit: unitWithoutExtraChars,
                    value: Number(valueWithoutExtraChars),
                    }
                }
            ]
        }
        
        if(xmlValidator.validateAirQuality(request).valid)
        {

            const airQuality = new AirQuality({
                _id: new mongoose.Types.ObjectId(),
                countryName: nameWithoutExtraChars,
                polutant: polutantWithoutExtraChars,
                variable: variableWithoutExtraChars,
                year: yearWithoutExtraChars,
                unit: unitWithoutExtraChars,
                value: valueWithoutExtraChars
            });
    
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

                res.status(201);
                res.send(json2xml.json2xml(response));
            })
            .catch(err => {
                if (err.code == 11000) {
                    const response = {
                        message: "The Air Quality you are trying to create already exists"
                    }
                    
                    res.status(303);
                    res.send(json2xml.json2xml(response));
                } else {
                    const response = {
                        message : err
                    }
                    res.status(500);
                    res.send(json2xml.json2xml(response));
                }
            });
        } else {
            const response = {
                message: "Air Quality does not match the schema"
            }

            res.status(422);
            res.send(json2xml.json2xml(response));
        }
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
            
            if(xmlValidator.validateAirQuality(response).valid) {
            
                res.status(200);
                res.send(json2xml.json2xml(response));
    
            } else {
                
                const response = {
                    message: "Air Quality does not match the schema"
                }
    
                res.status(422);
                res.send(json2xml.json2xml(response));
            }
            
        } else {
            const response = {
                message: 'No valid Air Quality found for provided parameters'
            }
            res.status(404);
            res.send(json2xml.json2xml(response));
        }
    })
    .catch(err => {
        const response = {
            message: err
        }
        res.status(500);
        res.send(json2xml.json2xml(response));
    })
}

exports.airQuality_patch_airQuality = (req, res) => {

    const airQuality = new AirQuality({
        countryName: req.params.countryName,
        year: req.params.year
    });

    for (countries of req.body.airQuality.country) {

        var countryNameWithExtraChars = countries.countryName.toString();
        var nameWithoutExtraChars = countryNameWithExtraChars.replace("[ ", "").replace(" ]", "");

        var polutantWithExtraChars = countries.polutant.toString();
        var polutantWithoutExtraChars = polutantWithExtraChars.replace("[ ", "").replace(" ]", "");

        var variableWithExtraChars = countries.variable.toString();
        var variableWithoutExtraChars = variableWithExtraChars.replace("[ ", "").replace(" ]", "");

        var yearWithExtraChars = countries.year.toString();
        var yearWithoutExtraChars = yearWithExtraChars.replace("[ ", "").replace(" ]", "");

        var unitWithExtraChars= countries.unit.toString();
        var unitWithoutExtraChars= unitWithExtraChars.replace("[ ", "").replace(" ]", "");

        var valueWithExtraChars = countries.value.toString();
        var valueWithoutExtraChars = valueWithExtraChars.replace("[ ", "").replace(" ]", "");

        const request = {
            airQuality: [
                {
                    country: {
                    countryName: nameWithoutExtraChars,
                    polutant: polutantWithoutExtraChars,
                    variable: variableWithoutExtraChars,
                    year: yearWithoutExtraChars,
                    unit: unitWithoutExtraChars,
                    value: Number(valueWithoutExtraChars),
                    }
                }
            ]
        }
        
        if(xmlValidator.validateAirQuality(request).valid)
        {

            const newAirQuality = new AirQuality({
                countryName: nameWithoutExtraChars,
                polutant: polutantWithoutExtraChars,
                variable: variableWithoutExtraChars,
                year: yearWithoutExtraChars,
                unit: unitWithoutExtraChars,
                value: valueWithoutExtraChars
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
                    res.send(json2xml.json2xml(response));

                } else {

                    const response = {
                        message: 'No valid Air Quality found for provided parameters',
                    }

                    res.send(json2xml.json2xml(response));

                }
            })
            .catch(err => {
                if (err.code == 11000) {
                    const response = {
                        message: "The Air Quality you are trying to update already exists",
                    }
                    res.status(303);
                    res.send(json2xml.json2xml(response));
                } else {
                    const response = {
                        message : err
                    }
                    res.status(500);
                    res.send(json2xml.json2xml(response));
                }
            });
        } else {
            const response = {
            message: "Air Quality does not match the schema"
            }

            res.status(422);
            res.send(json2xml.json2xml(response));
        } 
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
            res.send(json2xml.json2xml(response));
        } else {
            const response = {
                message: 'No valid Air Quality found for provided parameters',
            }
            res.status(404);
            res.send(json2xml.json2xml(response));
        }
    })
    .catch(err => {
        const response = {
            message : err
        }
        res.status(500);
        res.send(json2xml.json2xml(response));
    });
}