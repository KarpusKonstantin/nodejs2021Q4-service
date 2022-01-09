import dotenv from 'dotenv'
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const {PORT} = process.env
const {NODE_ENV} = process.env
const {MONGO_CONNECTION_STRING} = process.env
const {JWT_SECRET_KEY} = process.env
const {LOGGER_LEVEL} = process.env
const AUTH_MODE= process.env.AUTH_MODE === 'true'

export { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE, LOGGER_LEVEL };
