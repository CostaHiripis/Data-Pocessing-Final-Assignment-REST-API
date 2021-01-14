const Population = require('../models/population');
const mongoose = require('mongoose');
const jsonValidator = require('../validators/jsonValidator');

exports.population_get_populations = (req, res) => {

    Population.find()
    .select('countryName year count -_id')
    .exec()
    .then(results => {

        const response = {
            population: results.map(result => {
                return {
                    country: {
                        countryName: result.countryName,
                        year: result.year,
                        count: result.count,
                    },
                    message: "Population returned sucessfully"
                }
            })
        }

        if(jsonValidator.validatePopulation(response).valid) {
            
            res.status(200);
            res.send(response);

        } else {
            
            const response = {
                message: "Population does not match the schema"
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

exports.population_create_population = (req, res) => {


    if(jsonValidator.validatePopulation(req.body).valid)
    {
        for (populations of req.body.population) {

            const population = new Population({
                _id: new mongoose.Types.ObjectId(),
                countryName: populations.country.countryName,
                year: populations.country.year,
                count: populations.country.count,
            });
            
            population
            .save()
            .then(result => {
                const response = {
                    population: {
                        country: {
                            countryName: result.countryName,
                            year: result.year,
                            count: result.count,
                        },
                        message: "Population created sucessfully"
                    }

                }

                res.send(response);
                res.status(201);

            })
            .catch(err => {
                if (err.code == 11000) {
                    const response = {
                        message: "The Population you are trying to create already exists"
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
            message: "Population does not match the schema"
        }

        res.status(422);
        res.send(response);
    }
}

exports.population_get_population = (req, res) => {

    const population = new Population({
        countryName: req.params.countryName,
        year: req.params.year
    });

    Population.find(population)
    .select('countryName year count -_id')
    .exec()
    .then(results => {
        
        if (results.length == 1) {

            const response = {
                population: results.map(result => {
                    return {
                        country: {
                            countryName: result.countryName,
                            year: result.year,
                            count: result.count,
                        },
                        message: "Population returned sucessfully"
                    }
                })
            }

            if(jsonValidator.validatePopulation(response).valid) {
            
                res.status(200);
                res.send(response);
    
            } else {
                
                const response = {
                    message: "Population does not match the schema"
                }
    
                res.status(422);
                res.send(response);
                
            }
            
        } else {
            res.status(404).json({
                message: 'No valid Population found for provided parameters'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.population_patch_population = (req, res) => {

    if(jsonValidator.validatePopulation(req.body).valid)
    {

        const population = new Population({
            countryName: req.params.countryName,
            year: req.params.year
        });

        for (populations of req.body.population) {

            const newPopulation = new Population({
                countryName: populations.country.countryName,
                year: populations.country.year,
                count: populations.country.count,
            });
    
            Population.updateOne(population, {$set: newPopulation})
            .exec()
            .then(result => {
                if(result.nModified == 1)
                {
                    const response = {
                        message: 'Population updated'
                    }

                    res.status(200);
                    res.send(response);

                } else {

                    res.status(404).json({
                        message: 'No valid Population found for provided parameters',
                    });

                }
            })
            .catch(err => {
                if (err.code == 11000) {
                    const response = {
                        message: "The Population you are trying to update already exists",
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
            message: "Population does not match the schema"
        }

        res.status(422);
        res.send(response);
    } 
}

exports.population_delete_population = (req, res) => {

    const population = new Population({
        countryName: req.params.countryName,
        year: req.params.year
    });

    Population.deleteOne(population)
    .exec()
    .then(result => {
        if(result.deletedCount == 1)
        {
            const response = {
                message: 'Population deleted'
            }
            res.status(200);
            res.send(response);
        } else {
            res.status(404).json({
                message: 'No valid Population found for provided parameters',
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}