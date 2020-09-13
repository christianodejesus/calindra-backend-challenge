import { config } from 'dotenv'
import App from './app'

config({ path: '.env' })

const app = new App().app
const server = app.listen(process.env.PORT || 8080)

export default server
