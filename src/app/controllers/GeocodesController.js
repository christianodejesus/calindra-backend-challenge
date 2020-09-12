import { Client } from '@googlemaps/google-maps-services-js'
import httpStatus from 'http-status'

class GeocodesController {
  static async getCoordinates (address) {
    const gMapsClient = new Client()
    const coordinatesResult = await gMapsClient.geocode({
      params: {
        address, key: process.env.GOOGLE_API_KEY
      }
    })

    if (coordinatesResult.data.status === 'OK') {
      return coordinatesResult.data.results[0].geometry.location
    }

    return {}
  }

  async calcDistances (ctx) {
    const { addresses } = ctx.request.body

    if (!addresses || !Array.isArray(addresses) || addresses.length <= 1) {
      ctx.status = httpStatus.BAD_REQUEST
      ctx.body = { message: 'The addresses list must to have at least two addresses' }
    } else {
      ctx.body = { distances: [] }

      for (const address1 of addresses) {
        const address1Index = addresses.indexOf(address1)

        for (let index2 = address1Index + 1; index2 <= addresses.length - 1; index2++) {
          const address2 = addresses[index2]

          ctx.body.distances.push({
            addresses: {
              address1: {
                address: address1,
                coordinates: await GeocodesController.getCoordinates(address1)
              },
              address2: {
                address: address2,
                coordinates: await GeocodesController.getCoordinates(address2)
              }
            },
            distance: 0
          })
        }
      }
    }
  }
}

export default GeocodesController
