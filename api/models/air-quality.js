const mongoose = require('mongoose');

const airQualitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    countryName: {type: String, required: true},
    polutant: {type: String, required: true},
    variable: {type: String, required: true},
    year: {type: String, required: true},
    unit: {type: String, required: true},
    value: {type: Number, required: true},
});

airQualitySchema.index({countryName: 1, year: 1}, {unique: true});

module.exports = mongoose.model('AirQuality', airQualitySchema);