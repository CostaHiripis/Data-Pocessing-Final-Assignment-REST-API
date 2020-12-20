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
## List all Air Qualities Per Country

### Definition
`GET /air-quality-per-country/xml`

### Response 
- `200 OK` on success

```xml
<?xml version="1.0" encoding="UTF-8"?>
<air-quality-per-country>
  
    <country>
        <country-name>Australia</country-name>
        <polutant>Sulphur Dioxide</polutant>
        <variable>Total man-made emissions</variable>
        <year>1990</year>
        <unit>Tonnes</unit>
        <value>1585.754</value>
    </country>
    ...
    
</air-quality-per-country>
```

## Add a new value to Ait Quality Per Country 

### Definition 
`POST /air-quality-per-country/xml`

### Parameters

- `country-name: string` the name of the country the reading belongs to 
- `polutant: string` the name of the polutant
- `variable: string` the contributor of the polutant
- `year: gYear` the year the air quality was measured
- `unit: string` the units of the air quailty
- `value: decimal` the actual air quality value

If a country with the given parameters already exists, the existing values will be overwritten.

### Response

- `201 Created` on success

### XML
```xml

    <country>
        <country-name>Australia</country-name>
        <polutant>Sulphur Dioxide</polutant>
        <variable>Total man-made emissions</variable>
        <year>1990</year>
        <unit>Tonnes</unit>
        <value>1585.754</value>
    </country>

```
