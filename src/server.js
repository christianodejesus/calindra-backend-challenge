import { config } from 'dotenv'
import App from './app'

config({ path: '.env' })

const app = new App().app
const server = app.listen(process.env.API_PORT)

export default server
