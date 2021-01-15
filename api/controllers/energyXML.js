const Energy = require('../models/energy');
const mongoose = require('mongoose');
const json2xml = require('../json2xml/json2xml');
const xmlValidator = require('../validators/jsonValidator');

exports.energy_get_energies = (req, res) => {

    Energy.find()
    .select('countryName countryCode year energyConsumption -_id')
    .exec()
    .then(results => {

        const response = {
            energy: results.map(result => {
                return {
                    country: {
                        countryName: result.countryName,
                        countryCode: result.countryCode,
                        year: result.year,
                        energyConsumption: result.energyConsumption,
                    },
                    message: "Energy returned sucessfully"
                }
            })
        }

        if(xmlValidator.validateEnergy(response).valid) {
            
            res.status(200);
            res.send(json2xml.json2xml(response));

        } else {
            
            const response = {
                message: "Energy does not match the schema"
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

exports.energy_create_energy = (req, res) => {

    for (countries of req.body.energy.country) {

        var countryNameWithExtraChars = countries.countryName.toString();
        var nameWithoutExtraChars = countryNameWithExtraChars.replace("[ ", "").replace(" ]", "");

        var countryCodeWithExtraChars = countries.countryCode.toString();
        var countryCodeWithoutExtraChars = countryCodeWithExtraChars.replace("[ ", "").replace(" ]", "");

        var yearWithExtraChars = countries.year.toString();
        var yearWithoutExtraChars = yearWithExtraChars.replace("[ ", "").replace(" ]", "");

        var energyConsumptionWithExtraChars= countries.energyConsumption.toString();
        var energyConsumptionWithoutExtraChars= energyConsumptionWithExtraChars.replace("[ ", "").replace(" ]", "");

        const request = {
            energy: [
                {
                    country: {
                    countryName: countryNameWithExtraChars,
                    countryCode: countryCodeWithoutExtraChars,
                    year: yearWithoutExtraChars,
                    energyConsumption: Number(energyConsumptionWithoutExtraChars),
                    }
                }
            ]
        }
        
        if(xmlValidator.validateEnergy(request).valid)
        {

            const energy = new Energy({
                _id: new mongoose.Types.ObjectId(),
                countryName: nameWithoutExtraChars,
                countryCode: countryCodeWithoutExtraChars,
                year: yearWithoutExtraChars,
                energyConsumption: energyConsumptionWithoutExtraChars,
            });

            energy
            .save()
            .then(result => {
                const response = {
                    energy: {
                        country: {
                            countryName: result.countryName,
                            countryCode: result.countryCode,
                            year: result.year,
                            energyConsumption: result.energyConsumption,
                        },
                        message: "Energy created sucessfully"
                    }

                }

                res.send(json2xml.json2xml(response));
                res.status(201);

            })
            .catch(err => {
                if (err.code == 11000) {
                    const response = {
                        message: "The Energy you are trying to create already exists"
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
                message: "Energy does not match the schema"
            }

            res.status(422);
            res.send(json2xml.json2xml(response));
        }
    }   
}

exports.energy_get_energy = (req, res) => {

    const energy = new Energy({
        countryName: req.params.countryName,
        year: req.params.year
    });

    Energy.find(energy)
    .select('countryName countryCode year energyConsumption -_id')
    .exec()
    .then(results => {
        
        if (results.length == 1) {

            const response = {
                energy: results.map(result => {
                    return {
                        country: {
                            countryName: result.countryName,
                            countryCode: result.countryCode,
                            year: result.year,
                            energyConsumption: result.energyConsumption,
                        },
                        message: "Energy returned sucessfully"
                    }
                })
            }
            
            if(xmlValidator.validateEnergy(response).valid) {
            
                res.status(200);
                res.send(json2xml.json2xml(response));
    
            } else {
                
                const response = {
                    message: "Energy does not match the schema"
                }
    
                res.status(422);
                res.send(json2xml.json2xml(response));
            }
            
        } else {
            const response = {
                message: 'No valid Energy found for provided parameters'
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

exports.energy_patch_energy = (req, res) => {

    const energy = new Energy({
        countryName: req.params.countryName,
        year: req.params.year
    });

    for (countries of req.body.energy.country) {

        var countryNameWithExtraChars = countries.countryName.toString();
        var nameWithoutExtraChars = countryNameWithExtraChars.replace("[ ", "").replace(" ]", "");

        var countryCodeWithExtraChars = countries.countryCode.toString();
        var countryCodeWithoutExtraChars = countryCodeWithExtraChars.replace("[ ", "").replace(" ]", "");

        var yearWithExtraChars = countries.year.toString();
        var yearWithoutExtraChars = yearWithExtraChars.replace("[ ", "").replace(" ]", "");

        var energyConsumptionWithExtraChars= countries.energyConsumption.toString();
        var energyConsumptionWithoutExtraChars= energyConsumptionWithExtraChars.replace("[ ", "").replace(" ]", "");

        const request = {
            energy: [
                {
                    country: {
                    countryName: countryNameWithExtraChars,
                    countryCode: countryCodeWithoutExtraChars,
                    year: yearWithoutExtraChars,
                    energyConsumption: Number(energyConsumptionWithoutExtraChars),
                    }
                }
            ]
        }
        
        if(xmlValidator.validateEnergy(request).valid)
        {

            const newEnergy = new Energy({
                countryName: nameWithoutExtraChars,
                countryCode: countryCodeWithoutExtraChars,
                year: yearWithoutExtraChars,
                energyConsumption: energyConsumptionWithoutExtraChars,
            });

            Energy.updateOne(energy, {$set: newEnergy})
            .exec()
            .then(result => {
                if(result.nModified == 1)
                {
                    const response = {
                        message: 'Energy updated'
                    }

                    res.status(200);
                    res.send(json2xml.json2xml(response));

                } else {

                    const response = {
                        message: 'No valid Energy found for provided parameters',
                    }

                    res.send(json2xml.json2xml(response));

                }
            })
            .catch(err => {
                if (err.code == 11000) {
                    const response = {
                        message: "The Energy you are trying to update already exists",
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
                message: "Energy does not match the schema"
            }
        
            res.status(422);
            res.send(json2xml.json2xml(response));
        } 
    }
}

exports.energy_delete_energy = (req, res) => {

    const energy = new Energy({
        countryName: req.params.countryName,
        year: req.params.year
    });

    Energy.deleteOne(energy)
    .exec()
    .then(result => {
        if(result.deletedCount == 1)
        {
            const response = {
                message: 'Energy deleted'
            }
            res.status(200);
            res.send(json2xml.json2xml(response));
        } else {
            const response = {
                message: 'No valid Energy found for provided parameters',
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