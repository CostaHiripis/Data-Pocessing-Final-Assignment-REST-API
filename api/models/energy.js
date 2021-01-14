const mongoose = require('mongoose');

const energySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    countryName: {type: String, required: true},
    countryCode: {type: String, required: true},
    year: {type: String, required: true},
    energyConsumption: {type: Number, required: true},
});

energySchema.index({countryCode: 1, year: 1}, {unique: true});

module.exports = mongoose.model('Energy', energySchema);