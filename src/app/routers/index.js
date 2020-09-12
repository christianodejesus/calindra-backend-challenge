import Router from '@koa/router'
import { readdirSync } from 'fs'
import { basename, join } from 'path'

const mainRouter = new Router()

mainRouter.get('/', ctx => {
  ctx.body = {
    name: process.env.API_NAME,
    description: process.env.API_DESCRIPTION,
    version: process.env.API_VERSION || '0.0.1'
  }
})

// import all *Router.js files in the directory
readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 &&
      file !== basename(__filename) &&
      file.slice(-9) === 'Router.js'
  )
  .forEach(async file => {
    const module = await require(join(__dirname, file))
    const childRouter = module.default
    mainRouter.use(childRouter.routes(), childRouter.allowedMethods())
  })

export default mainRouter
