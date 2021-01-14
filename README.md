# Data-Pocessing-Final-Assignment-REST-API 

## Usage 

All responses will either be in the format of JSON or XML

### JSON
```json
{
    "data": "Content of the response",
    "message": "Description of what happened"
}
```
### XML
```xml
<data>Content of the response</data>
<message>Description of what happened</message>
```

## Add a new value to Air Quality

### Definition 
`POST http://localhost:3000/air-quality/xml`

### Parameters

- `countryName: string` the name of the country the reading belongs to 
- `polutant: string` the name of the polutant
- `variable: string` the contributor of the polutant
- `year: gYear` the year the air quality was measured
- `unit: string` the units of the air quailty
- `value: decimal` the actual air quality value

### Response

- `201 Created` on success
- `303 See Other` on trying to create an Air Quailty that already exists

### XML on success
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<airQuality>
    <country>
        <countryName>Austria</countryName>
        <polutant>Sulphur Dioxide</polutant>
        <variable>Total man-made emissions</variable>
        <year>1990</year>
        <unit>Tonnes</unit>
        <value>1585.754</value>
    </country>
    <message>Air Quality created sucessfully</message>
</airQuality>
```
### XML on trying to create an Air Quailty that already exists
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>The Air Quality you are trying to create already exists</message>
```

## List all Air Qualities

### Definition
`GET http://localhost:3000/air-quality/xml`

### Response 
- `200 OK` on success

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<airQuality>
    <country>
        <countryName>Austria</countryName>
        <polutant>Sulphur Dioxide</polutant>
        <variable>Total man-made emissions</variable>
        <year>1990</year>
        <unit>Tonnes</unit>
        <value>1585.754</value>
    </country>
    <message>Air Quality returned sucessfully</message>
    ...
</airQuality>
```

## List a specific value from Air Quality

### Definition 
`GET http://localhost:3000/air-quality/xml/:countryName/:year`

### Parameters

- `countryName: string` the name of the country the reading belongs to 
- `year: gYear` the year the air quality was measured

### Response

- `201 Created` on success
- `404 Not Found` on trying retrieve a specific Air Quailty that does not exist

### XML on success
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<airQuality>
    <country>
        <countryName>Austria</countryName>
        <polutant>Sulphur Dioxide</polutant>
        <variable>Total man-made emissions</variable>
        <year>1990</year>
        <unit>Tonnes</unit>
        <value>1585.754</value>
    </country>
    <message>Air Quality returned sucessfully</message>
</airQuality>
```
### XML on trying retrieve a specific Air Quailty that does not exist
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>No valid Air Quality found for provided parameters</message>
```

