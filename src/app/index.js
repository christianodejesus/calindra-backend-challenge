import cors from '@koa/cors'
import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import routers from './routers'

class App {
  constructor () {
    this.app = new Koa()

    this.middlewares()
    this.routes()
  }

  middlewares () {
    // bodyparser middleware
    this.app.use(bodyparser())

    // Middleware to set header that enable CORS
    this.app.use(cors())

    // Middleware to handle exceptions
    this.app.use(async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        ctx.status = 500
        ctx.body = { message: err.message }
      }
    })
  }

  routes () {
    // use the app routers
    this.app.use(routers.routes())
    this.app.use(routers.allowedMethods())
  }
}

export default App
