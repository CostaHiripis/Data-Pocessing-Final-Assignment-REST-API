# Data-Processing-Final-Assignment-REST-API 

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
- `POST http://localhost:3000/air-quality/xml`
- `POST http://localhost:3000/air-quality/json`

### Body
#### XML
```XML
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
</airQuality>
```
#### JSON
```json
{
    "airQuality": [
        {
            "country": {
                "countryName": "Austria",
                "polutant": "Sulphur Dioxide",
                "variable": "Total man-made emissions",
                "year": "1990",
                "unit": "Tonnes",
                "value": 1585.754
            }
        }
    ]
}
```

### Response

- `201 Created` on success
- `303 See Other` on trying to create an Air Quality that already exists
- `422 Unprocessable Entity` on trying to create an Air Quality that doesn't match the schema

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
    <message>Air Quality created successfully</message>
</airQuality>
```
### JSON on success
```json
{
  "airQuality": {
    "country": {
      "countryName": "Austria",
      "polutant": "Sulphur Dioxide",
      "variable": "Total man-made emissions",
      "year": "1990",
      "unit": "Tonnes",
      "value": 1585.754
    },
    "message": "Air Quality created successfully"
  }
}
```
### XML on trying to create an Air Quality that already exists
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>The Air Quality you are trying to create already exists</message>
```
### JSON on trying to create an Air Quality that already exists
```json
{
  "message": "The Air Quality you are trying to create already exists"
}
```
### XML on trying to create an Air Quality that doesn't match the schema
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Air Quality does not match the schema</message>
```
### JSON on trying to create an Air Quality that doesn't match the schema
```json
{
  "message": "Air Quality does not match the schema"
}
```

## List all Air Qualities

### Definition
- `GET http://localhost:3000/air-quality/xml`
- `GET http://localhost:3000/air-quality/json`

### Response 
- `200 OK` on success
- `422 Unprocessable Entity` on trying to retrieve all the Air Qualities, but one or more do not match the schema

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
    <message>Air Quality returned successfully</message>
    ...
</airQuality>
```
### JSON on success
```json
{
  "airQuality": [
    {
      "country": {
        "countryName": "Austria",
        "polutant": "Sulphur Dioxide",
        "variable": "Total man-made emissions",
        "year": "1990",
        "unit": "Tonnes",
        "value": 1585.754
      },
      "message": "Air Quality returned successfully"
    }
  ]
}
```

### XML on trying to retrieve all the Air Qualities, but one or more do not match the schema
```XML
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Air Quality does not match the schema</message>
```
### JSON on trying to retrieve all the Air Qualities, but one or more do not match the schema
```json
{
  "message": "Air Quality does not match the schema"
}
```

## List a specific Air Quality

### Definition 
- `GET http://localhost:3000/air-quality/xml/Austria/1990`
- `GET http://localhost:3000/air-quality/json/Austria/1990`

### Parameters

- `countryName: string` the name of the country the air quality belongs to 
- `year: string` the year the air quality was measured

### Response

- `201 Created` on success
- `404 Not Found` on trying retrieve a specific Air Quality that does not exist
- `422 Unprocessable Entity` on trying to retrieve a specific Air Quality, but it does not match the schema

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
    <message>Air Quality returned successfully</message>
</airQuality>
```
### JSON on success
```json
{
  "airQuality": [
    {
      "country": {
        "countryName": "Austria",
        "polutant": "Sulphur Dioxide",
        "variable": "Total man-made emissions",
        "year": "1990",
        "unit": "Tonnes",
        "value": 1585.754
      },
      "message": "Air Quality returned successfully"
    }
  ]
}
```

### XML on trying to retrieve a specific Air Quality that does not exist
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>No valid Air Quality found for provided parameters</message>
```
### JSON on trying to retrieve a specific Air Quality that does not exist
```json
{
  "message": "No valid Air Quality found for provided parameters"
}
```

### XML on trying to retrieve a specific Air Quality, but it does not match the schema
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Air Quality does not match the schema</message>
```
### JSON on trying to retrieve a specific Air Quality, but it does not match the schema
```json
{
  "message": "Air Quality does not match the schema"
}
```

## Update a specific Air Quality

### Definition 
- `PATCH http://localhost:3000/air-quality/xml/Austria/1990`
- `PATCH http://localhost:3000/air-quality/json/Austria/1990`

### Parameters

- `countryName: string` the name of the country the air quality belongs to
- `year: string` the year the air quality was measured

### Body
#### XML
```XML
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<airQuality>
	<country>
		<countryName>Austria</countryName>
		<polutant>Sulphur Dioxide</polutant>
		<variable>Total man-made emissions</variable>
		<year>2020</year>
		<unit>Tonnes</unit>
		<value>1585.754</value>
	</country>
</airQuality>
```
#### JSON
```json
{
    "airQuality": [
        {
            "country": {
                "countryName": "Austria",
                "polutant": "Sulphur Dioxide",
                "variable": "Total man-made emissions",
                "year": "2020",
                "unit": "Tonnes",
                "value": 1585.754
            }
        }
    ]
}
```

### Response

- `201 Created` on success
- `404 Not Found` on trying to update a specific Air Quality that doesn't exist
- `422 Unprocessable Entity` on trying to update a specific Air Quality, but it does not match the schema

### XML on success
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Air Quality updated</message>
```
### JSON on success
```json
{
  "message": "Air Quality updated"
}
```

### XML on trying to update a specific Air Quality that does not exist
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>No valid Air Quality found for provided parameters</message>
```
### JSON on trying to update a specific Air Quality that does not exist
```json
{
  "message": "No valid Air Quality found for provided parameters"
}
```

### XML on trying to update a specific Air Quality, but it does not match the schema
```XML
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Air Quality does not match the schema</message>
```
### JSON on trying to update a specific Air Quality, but it does not match the schema
```json
{
  "message": "Air Quality does not match the schema"
}
```

## Delete a specific Air Quality

### Definition
- `DELETE http://localhost:3000/air-quality/xml/Austria/2020`
- `DELETE http://localhost:3000/air-quality/json/Austria/2020`

### Parameters

- `countryName: string` the name of the country the air quality belongs to
- `year: string` the year the air quality was measured

### Response

- `200 OK` on success
- `404 Not Found` on trying to delete a specific Air Quality that does not exist

### XML on success
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Air Quality deleted</message>
```
### JSON on success
```json
{
  "message": "Air Quality deleted"
}
```
### XML on trying to delete a specific Air Quality that does not exist
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>No valid Air Quality found for provided parameters</message>
```
### JSON on trying to delete a specific Air Quality that does not exist
```json
{
  "message": "No valid Air Quality found for provided parameters"
}
```


## Add a new value to Energy

### Definition
- `POST http://localhost:3000/energy/xml`
- `POST http://localhost:3000/energy/json`

### Body
#### XML
```XML
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<energy>
    <country>
        <countryName>Afghanistan</countryName>
        <countryCode>AFG</countryCode>
        <year>1980</year>
        <energyConsumption>581.9322012</energyConsumption>
    </country>
</energy>
```
#### JSON
```json
{
  "energy": [
    {
      "country": {
        "countryName": "Afghanistan",
        "countryCode": "AFG",
        "year": "1980",
        "energyConsumption": 581.9322012
      }
    }
  ]
}
```

### Response

- `201 Created` on success
- `303 See Other` on trying to create an Energy that already exists
- `422 Unprocessable Entity` on trying to create an Energy that doesn't match the schema

### XML on success
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<energy>
    <country>
        <countryName>Afghanistan</countryName>
        <countryCode>AFG</countryCode>
        <year>1980</year>
        <energyConsumption>581.9322012</energyConsumption>
    </country>
    <message>Energy created successfully</message>
</energy>
```
### JSON on success
```json
{
  "energy": {
    "country": {
      "countryName": "Afghanistan",
      "countryCode": "AFG",
      "year": "1980",
      "energyConsumption": 581.9322012
    },
    "message": "Energy created successfully"
  }
}
```
### XML on trying to create an Energy that already exists
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>The Energy you are trying to create already exists</message>
```
### JSON on trying to create an Energy that already exists
```json
{
  "message": "The Energy you are trying to create already exists"
}
```
### XML on trying to create an Energy that doesn't match the schema
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Energy does not match the schema</message>
```
### JSON on trying to create an Energy that doesn't match the schema
```json
{
  "message": "Energy does not match the schema"
}
```

## List all Energies

### Definition
- `GET http://localhost:3000/energy/xml`
- `GET http://localhost:3000/energy/json`

### Response
- `200 OK` on success
- `422 Unprocessable Entity` on trying to retrieve all the Energies, but one or more do not match the schema

### XML on success
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<energy>
    <country>
        <countryName>Afghanistan</countryName>
        <countryCode>AFG</countryCode>
        <year>1980</year>
        <energyConsumption>581.9322012</energyConsumption>
    </country>
    <message>Energy returned successfully</message>
    ...
</energy>
```
### JSON on success
```json
{
  "energy": [
    {
      "country": {
        "countryName": "Afghanistan",
        "countryCode": "AFG",
        "year": "1980",
        "energyConsumption": 581.9322012
      },
      "message": "Energy returned successfully"
    }
  ]
}
```

### XML on trying to retrieve all the Energies, but one or more do not match the schema
```XML
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Energy does not match the schema</message>
```
### JSON on trying to retrieve all the Energies, but one or more do not match the schema
```json
{
  "message": "Energy does not match the schema"
}
```

## List a specific Energy

### Definition
- `GET http://localhost:3000/energy/xml/Afghanistan/1980`
- `GET http://localhost:3000/energy/json/Afghanistan/1980`

### Parameters

- `countryName: string` the name of the country the energy belongs to
- `year: string` the year the energy was measured

### Response

- `201 Created` on success
- `404 Not Found` on trying retrieve a specific Energy that does not exist
- `422 Unprocessable Entity` on trying to retrieve a specific Energy, but it does not match the schema

### XML on success
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<energy>
    <country>
        <countryName>Afghanistan</countryName>
        <countryCode>AFG</countryCode>
        <year>1980</year>
        <energyConsumption>581.9322012</energyConsumption>
    </country>
    <message>Energy returned successfully</message>
</energy>
```
### JSON on success
```json
{
  "energy": [
    {
      "country": {
        "countryName": "Afghanistan",
        "countryCode": "AFG",
        "year": "1980",
        "energyConsumption": 581.9322012
      },
      "message": "Energy returned successfully"
    }
  ]
}
```

### XML on trying to retrieve a specific Energy that does not exist
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>No valid Energy found for provided parameters</message>
```
### JSON on trying to retrieve a specific Energy that does not exist
```json
{
  "message": "No valid Energy found for provided parameters"
}
```

### XML on trying to retrieve a specific Energy, but it does not match the schema
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Energy does not match the schema</message>
```
### JSON on trying to retrieve a specific Energy, but it does not match the schema
```json
{
  "message": "Energy does not match the schema"
}
```

## Update a specific Energy

### Definition
- `PATCH http://localhost:3000/energy/xml/Afghanistan/1980`
- `PATCH http://localhost:3000/energy/json/Afghanistan/1980`

### Parameters

- `countryName: string` the name of the country the energy belongs to
- `year: string` the year the energy was measured

### Body
#### XML
```XML
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<energy>
    <country>
        <countryName>Afghanistan</countryName>
        <countryCode>AFG</countryCode>
        <year>2020</year>
        <energyConsumption>581.9322012</energyConsumption>
    </country>
</energy>
```
#### JSON
```json
{
  "energy": [
    {
      "country": {
        "countryName": "Afghanistan",
        "countryCode": "AFG",
        "year": "2020",
        "energyConsumption": 581.9322012
      }
    }
  ]
}
```

### Response

- `201 Created` on success
- `404 Not Found` on trying to update a specific Energy that doesn't exist
- `422 Unprocessable Entity` on trying to update a specific Energy, but it does not match the schema

### XML on success
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Energy updated</message>
```
### JSON on success
```json
{
  "message": "Energy updated"
}
```

### XML on trying to update a specific Energy that does not exist
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>No valid Energy found for provided parameters</message>
```
### JSON on trying to update a specific Energy that does not exist
```json
{
  "message": "No valid Energy found for provided parameters"
}
```

### XML on trying to update a specific Energy, but it does not match the schema
```XML
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Energy does not match the schema</message>
```
### JSON on trying to update a specific Energy, but it does not match the schema
```json
{
  "message": "Energy does not match the schema"
}
```

## Delete a specific Energy

### Definition
- `DELETE http://localhost:3000/energy/xml/Afghanistan/1980`
- `DELETE http://localhost:3000/energy/json/Afghanistan/1980`

### Parameters

- `countryName: string` the name of the country the energy belongs to
- `year: string` the year the energy was measured

### Response

- `200 OK` on success
- `404 Not Found` on trying to delete a specific Energy that does not exist

### XML on success
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Energy deleted</message>
```
### JSON on success
```json
{
  "message": "Energy deleted"
}
```
### XML on trying to delete a specific Air Quality that does not exist
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>No valid Energy found for provided parameters</message>
```
### JSON on trying to delete a specific Air Quality that does not exist
```json
{
  "message": "No valid Energy found for provided parameters"
}
```

## Add a new value to Population

### Definition
- `POST http://localhost:3000/population/xml`
- `POST http://localhost:3000/population/json`

### Body
#### XML
```XML
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<population>
    <country>
        <countryName>Aruba</countryName>
        <year>1960</year>
        <count>54211</count>
    </country>
</population>
```
#### JSON
```json
{
  "population": [
    {
      "country": {
        "countryName": "Aruba",
        "year": "1960",
        "count": 54211
      }
    }
  ]
}
```

### Response

- `201 Created` on success
- `303 See Other` on trying to create a Population that already exists
- `422 Unprocessable Entity` on trying to create a Population that doesn't match the schema

### XML on success
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<population>
    <country>
        <countryName>Aruba</countryName>
        <year>1960</year>
        <count>54211</count>
    </country>
    <message>Population created successfully</message>
</population>
```
### JSON on success
```json
{
  "population": {
    "country": {
      "countryName": "Aruba",
      "year": "1960",
      "count": 54211
    },
    "message": "Population created successfully"
  }
}
```
### XML on trying to create a Population that already exists
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>The Population you are trying to create already exists</message>
```
### JSON on trying to create a Population that already exists
```json
{
  "message": "The Population you are trying to create already exists"
}
```
### XML on trying to create a Population that doesn't match the schema
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Population does not match the schema</message>
```
### JSON on trying to create a Population that doesn't match the schema
```json
{
  "message": "Population does not match the schema"
}
```

## List all Populations

### Definition
- `GET http://localhost:3000/population/xml`
- `GET http://localhost:3000/population/json`

### Response
- `200 OK` on success
- `422 Unprocessable Entity` on trying to retrieve all the Populations, but one or more do not match the schema

### XML on success
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<population>
    <country>
        <countryName>Aruba</countryName>
        <year>1960</year>
        <count>54211</count>
    </country>
    <message>Population returned successfully</message>
    ...
</population>
```
### JSON on success
```json
{
  "population": [
    {
      "country": {
        "countryName": "Aruba",
        "year": "1960",
        "count": 54211
      },
      "message": "Population returned successfully"
    }
  ]
}
```

### XML on trying to retrieve all the Populations, but one or more do not match the schema
```XML
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Population does not match the schema</message>
```
### JSON on trying to retrieve all the Populations, but one or more do not match the schema
```json
{
  "message": "Population does not match the schema"
}
```

## List a specific Population

### Definition
- `GET http://localhost:3000/population/xml/Aruba/1960`
- `GET http://localhost:3000/population/xml/Aruba/1960`

### Parameters

- `countryName: string` the name of the country the population belongs to
- `year: string` the year the population was measured

### Response

- `201 Created` on success
- `404 Not Found` on trying retrieve a specific Population that does not exist
- `422 Unprocessable Entity` on trying to retrieve a specific Population, but it does not match the schema

### XML on success
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<population>
    <country>
        <countryName>Aruba</countryName>
        <year>1960</year>
        <count>54211</count>
    </country>
    <message>Population returned successfully</message>
</population>
```
### JSON on success
```json
{
  "population": [
    {
      "country": {
        "countryName": "Aruba",
        "year": "1960",
        "count": 54211
      },
      "message": "Population returned successfully"
    }
  ]
}
```

### XML on trying to retrieve a specific Population that does not exist
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>No valid Population found for provided parameters</message>
```
### JSON on trying to retrieve a specific Population that does not exist
```json
{
  "message": "No valid Population found for provided parameters"
}
```

### XML on trying to retrieve a specific Population, but it does not match the schema
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Population does not match the schema</message>
```
### JSON on trying to retrieve a specific Population, but it does not match the schema
```json
{
  "message": "Population does not match the schema"
}
```

## Update a specific Population

### Definition
- `PATCH http://localhost:3000/population/xml/Aruba/1960`
- `PATCH http://localhost:3000/population/json/Aruba/1960`

### Parameters

- `countryName: string` the name of the country the population belongs to
- `year: string` the year the population was measured

### Body
#### XML
```XML
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<population>
    <country>
        <countryName>Aruba</countryName>
        <year>2020</year>
        <count>54211</count>
    </country>
</population>
```
#### JSON
```json
{
  "population": [
    {
      "country": {
        "countryName": "Aruba",
        "year": "2020",
        "count": 54211
      }
    }
  ]
}
```

### Response

- `201 Created` on success
- `404 Not Found` on trying to update a specific Population that doesn't exist
- `422 Unprocessable Entity` on trying to update a specific Population, but it does not match the schema

### XML on success
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Population updated</message>
```
### JSON on success
```json
{
  "message": "Population updated"
}
```

### XML on trying to update a specific Population that does not exist
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>No valid Population found for provided parameters</message>
```
### JSON on trying to update a specific Population that does not exist
```json
{
  "message": "No valid Population found for provided parameters"
}
```

### XML on trying to update a specific Population, but it does not match the schema
```XML
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Population does not match the schema</message>
```
### JSON on trying to update a specific Population, but it does not match the schema
```json
{
  "message": "Population does not match the schema"
}
```

## Delete a specific Population

### Definition
- `http://localhost:3000/population/xml/Aruba/1960`
- `http://localhost:3000/population/json/Aruba/1960`

### Parameters

- `countryName: string` the name of the country the population belongs to
- `year: string` the year the population was measured

### Response

- `200 OK` on success
- `404 Not Found` on trying to delete a specific Population that does not exist

### XML on success
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>Population deleted</message>
```
### JSON on success
```json
{
  "message": "Population deleted"
}
```
### XML on trying to delete a specific Population that does not exist
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<message>No valid Population found for provided parameters</message>
```
### JSON on trying to delete a specific Population that does not exist
```json
{
  "message": "No valid Population found for provided parameters"
}
```
