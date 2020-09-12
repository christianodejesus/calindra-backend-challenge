import Router from '@koa/router'
import GeocodesController from '../controllers/GeocodesController'

const router = new Router({ prefix: '/geocodes' })
const geocodesController = new GeocodesController()

router.post('/', geocodesController.calcDistances)

export default router
