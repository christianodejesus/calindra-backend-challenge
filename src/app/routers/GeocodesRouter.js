import Router from '@koa/router'
import GeocodesController from '../controllers/GeocodesController'

const router = new Router({ prefix: '/distances' })
const geocodesController = new GeocodesController()

router.post('/', geocodesController.calculateEuclideanDistances)

export default router
