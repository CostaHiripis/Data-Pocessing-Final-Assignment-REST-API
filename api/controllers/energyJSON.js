const Energy = require('../models/energy');
const mongoose = require('mongoose');
const jsonValidator = require('../validators/jsonValidator');

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

        if(jsonValidator.validateEnergy(response).valid) {
            
            res.status(200);
            res.send(response);

        } else {
            
            const response = {
                message: "Energy does not match the schema"
            }

            res.status(422);
            res.send(response);
            
        }
    })
    .catch(err => {
        res.status(500).json({
           error: err
        });
    })
}

exports.energy_create_energy = (req, res) => {


    if(jsonValidator.validateEnergy(req.body).valid)
    {
        for (energies of req.body.energy) {

            const energy = new Energy({
                _id: new mongoose.Types.ObjectId(),
                countryName: energies.country.countryName,
                countryCode: energies.country.countryCode,
                year: energies.country.year,
                energyConsumption: energies.country.energyConsumption,
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

                res.send(response);
                res.status(201);

            })
            .catch(err => {
                if (err.code == 11000) {
                    const response = {
                        message: "The Energy you are trying to create already exists"
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
            message: "Energy does not match the schema"
        }

        res.status(422);
        res.send(response);
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

            if(jsonValidator.validateEnergy(response).valid) {
            
                res.status(200);
                res.send(response);
    
            } else {
                
                const response = {
                    message: "Energy does not match the schema"
                }
    
                res.status(422);
                res.send(response);
                
            }
            
        } else {
            res.status(404).json({
                message: 'No valid Energy found for provided parameters'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.energy_patch_energy = (req, res) => {

    if(jsonValidator.validateEnergy(req.body).valid)
    {

        const energy = new Energy({
            countryName: req.params.countryName,
            year: req.params.year
        });

        for (energies of req.body.energy) {

            const newEnergy = new Energy({
                countryName: energies.country.countryName,
                countryCode: energies.country.countryCode,
                year: energies.country.year,
                energyConsumption: energies.country.energyConsumption,
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
                    res.send(response);

                } else {

                    res.status(404).json({
                        message: 'No valid Energy found for provided parameters',
                    });

                }
            })
            .catch(err => {
                if (err.code == 11000) {
                    const response = {
                        message: "The Energy you are trying to update already exists",
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
            message: "Energy does not match the schema"
        }

        res.status(422);
        res.send(response);
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
            res.send(response);
        } else {
            res.status(404).json({
                message: 'No valid Energy found for provided parameters',
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}