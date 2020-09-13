# Geocode Distances API

RestAPI for Calindra Tech backend challenge
<br><br>

## Key technologies
- [NodeJS](https://nodejs.org/) Ecosystem
- [KoaJS](https://koajs.com) Web Framework
- [Google Maps Services Api](https://github.com/googlemaps/google-maps-services-js)
<br><br>

## Online Version

This API is online at [https://geocode-distances-api.herokuapp.com/](https://geocode-distances-api.herokuapp.com/).
<br><br>


## Installation and configuration

Download or clone API source code and follow above steps

```bash
$ npm install
$ npm run setup:env # This will setup an .env file with the environment variables
```

Before you run the API, you need to provide your [Google Maps Geocode API Key](https://developers.google.com/maps/documentation/geocoding/get-api-key) in the .env file, to do this, open .env and set your API Key in the GOOGLE_API_KEY variable and save the .env file.
<br><br>

## Running the RestAPI

Now you can run the Geocode Distances API with the commands...

```bash
$ npm run dev # To run the API for development
# or
$ npm run build # To build and run the API
$ npm start
```
<br>

## Geocode API Endpoints
<br>

### GET /

Endpoint to test API execution.

### _returns_

```
{
  "name": "Geocode Distances API",
  "description": "RestAPI for Calindra Tech backend code challenge",
  "version": "1.0.0"
}
```
<br>

### POST /distances

Endpoint to calculate the distances from all possible combinations of provided addresses.

### _body_

The request body must have two or more elements in "addresses" array.

```
{
	"addresses": [
		"Av. Rio Branco, 1 Centro, Rio de Janeiro RJ, 20090003",
		"Praça Mal. Âncora, 122 Centro, Rio de Janeiro RJ, 20021200",
		"Rua 19 de Fevereiro, 34 Botafogo, Rio de Janeiro RJ, 22280030"
	]
}
```

### _returns_

The endpoint returns an object containing "distances" array, with all possible combinations of provided addresses and their calculated distances using Euclidian Distance formula.

The "nearest" object is the more closest addresses of all combinations and the "farthest" is the more distant addresses.

```
{
  "distances": [
    {
      "addressesPair": {
        "address1": {
          "address": "Av. Rio Branco, 1 Centro, Rio de Janeiro RJ, 20090003",
          "coordinates": {
            "lat": -22.8973551,
            "lng": -43.1802782
          }
        },
        "address2": {
          "address": "Praça Mal. Âncora, 122 Centro, Rio de Janeiro RJ, 20021200",
          "coordinates": {
            "lat": -22.9039608,
            "lng": -43.1703536
          }
        }
      },
      "distance": 0.011921952761606592
    },
    {
      "addressesPair": {
        "address1": {
          "address": "Praça Mal. Âncora, 122 Centro, Rio de Janeiro RJ, 20021200",
          "coordinates": {
            "lat": -22.9039608,
            "lng": -43.1703536
          }
        },
        "address2": {
          "address": "Rua 19 de Fevereiro, 34 Botafogo, Rio de Janeiro RJ, 22280030",
          "coordinates": {
            "lat": -22.9507092,
            "lng": -43.1876443
          }
        }
      },
      "distance": 0.049843567378850276
    },
    {
      "addressesPair": {
        "address1": {
          "address": "Av. Rio Branco, 1 Centro, Rio de Janeiro RJ, 20090003",
          "coordinates": {
            "lat": -22.8973551,
            "lng": -43.1802782
          }
        },
        "address2": {
          "address": "Rua 19 de Fevereiro, 34 Botafogo, Rio de Janeiro RJ, 22280030",
          "coordinates": {
            "lat": -22.9507092,
            "lng": -43.1876443
          }
        }
      },
      "distance": 0.05386018395828296
    }
  ],
  "nearest": {
    "addressesPair": {
      "address1": {
        "address": "Av. Rio Branco, 1 Centro, Rio de Janeiro RJ, 20090003",
        "coordinates": {
          "lat": -22.8973551,
          "lng": -43.1802782
        }
      },
      "address2": {
        "address": "Praça Mal. Âncora, 122 Centro, Rio de Janeiro RJ, 20021200",
        "coordinates": {
          "lat": -22.9039608,
          "lng": -43.1703536
        }
      }
    },
    "distance": 0.011921952761606592
  },
  "farthest": {
    "addressesPair": {
      "address1": {
        "address": "Av. Rio Branco, 1 Centro, Rio de Janeiro RJ, 20090003",
        "coordinates": {
          "lat": -22.8973551,
          "lng": -43.1802782
        }
      },
      "address2": {
        "address": "Rua 19 de Fevereiro, 34 Botafogo, Rio de Janeiro RJ, 22280030",
        "coordinates": {
          "lat": -22.9507092,
          "lng": -43.1876443
        }
      }
    },
    "distance": 0.05386018395828296
  }
}
```
