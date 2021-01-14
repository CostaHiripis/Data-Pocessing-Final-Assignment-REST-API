const mongoose = require('mongoose');

const populationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    countryName: {type: String, required: true},
    year: {type: String, required: true},
    count: {type: Number, required: true},
});

populationSchema.index({countryName: 1, year: 1}, {unique: true});

module.exports = mongoose.model('Population', populationSchema);