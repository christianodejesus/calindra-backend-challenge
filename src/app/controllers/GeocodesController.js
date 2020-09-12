import { Client } from '@googlemaps/google-maps-services-js'
import httpStatus from 'http-status'

class GeocodesController {
  async calcDistances (ctx) {
    const { addresses } = ctx.request.body

    if (!addresses || !Array.isArray(addresses) || addresses.length === 0) {
      ctx.status = httpStatus.BAD_REQUEST
      ctx.body = { message: 'addresses array is not provided or is an empty array' }
    } else {
      ctx.body = { distances: [] }
      const client = new Client({})

      addresses.forEach((address1, index, arr) => {
        arr.forEach(async (address2, index2) => {
          if (index2 <= index) {
            return
          }

          const address1Coord = await client.geocode({
            params: {
              address: encodeURI(address1),
              key: process.env.GOOGLE_API_KEY
            }
          })

          ctx.body.distances.push({
            addresses: [address1, address2],
            coordinates: [address1Coord.data, [1, 1]],
            distance: 0
          })
        })
      })
    }
  }
}

export default GeocodesController
