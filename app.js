const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('body-parser-xml')(bodyParser);

const airQualityRoutes = require('./api/routes/air-quality');
const energyRoutes = require('./api/routes/energy');
const populationRoutes = require('./api/routes/population');

mongoose.connect('mongodb+srv://root:toor@predatorapi.3pc5i.mongodb.net/predatorapi?retryWrites=true&w=majority',
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.xml());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/air-quality', airQualityRoutes);
app.use('/energy', energyRoutes);
app.use('/population', populationRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;