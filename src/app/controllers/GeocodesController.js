import { Client } from '@googlemaps/google-maps-services-js'
import httpStatus from 'http-status'

class GeocodesController {
  static calculateEuclideanDistance (x1, x2, y1, y2) {
    const xAxisPower = (x2 - x1) ** 2
    const yAxisPower = (y2 - y1) ** 2

    return Math.sqrt(xAxisPower + yAxisPower)
  }

  static async getCoordinates (gMapsClient, address, cache) {
    const fromCache = cache[address.replace(/\s/g, '')]

    if (fromCache) {
      return fromCache
    }

    const coordinatesResult = await gMapsClient.geocode({
      params: {
        address, key: process.env.GOOGLE_API_KEY
      }
    })

    if (coordinatesResult.data.status === 'OK') {
      cache[address.replace(/\s/g, '')] = coordinatesResult.data.results[0].geometry.location
      return coordinatesResult.data.results[0].geometry.location
    }

    return {}
  }

  async calculateEuclideanDistances (ctx) {
    const { addresses } = ctx.request.body

    if (!addresses || !Array.isArray(addresses) || addresses.length <= 1) {
      ctx.status = httpStatus.BAD_REQUEST
      ctx.body = { message: 'The addresses list must to have at least two addresses' }
    } else {
      ctx.body = {
        distances: [],
        nearest: {},
        farthest: {}
      }
      const gMapsClient = new Client()
      const coordinatesCache = {}

      for (const address1 of addresses) {
        const address1Index = addresses.indexOf(address1)
        const address1Coordinates = await GeocodesController.getCoordinates(gMapsClient, address1, coordinatesCache)

        for (let index2 = address1Index + 1; index2 <= addresses.length - 1; index2++) {
          const address2 = addresses[index2]

          const addressesPair = {
            address1: {
              address: address1,
              coordinates: address1Coordinates
            },
            address2: {
              address: address2,
              coordinates: await GeocodesController.getCoordinates(gMapsClient, address2, coordinatesCache)
            }
          }

          const distance = GeocodesController.calculateEuclideanDistance(
            Number(addressesPair.address1.coordinates.lat),
            Number(addressesPair.address2.coordinates.lat),
            Number(addressesPair.address1.coordinates.lng),
            Number(addressesPair.address2.coordinates.lng)
          )

          ctx.body.distances.push({
            addressesPair,
            distance
          })
        }
      }

      const sorted = ctx.body.distances.sort((item1, item2) => item1.distance > item2.distance)
      ctx.body.nearest = sorted[0]
      ctx.body.farthest = sorted[sorted.length - 1]
    }
  }
}

export default GeocodesController
