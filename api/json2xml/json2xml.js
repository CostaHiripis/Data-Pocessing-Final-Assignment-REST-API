const xml2js = require('xml2js');

const builder = new xml2js.Builder({
    renderOpts: { 'pretty': true }
});

exports.json2xml = (response) => {
    
    response = builder.buildObject(response);
    return response;
}



