import dotenv from 'dotenv'
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const {PORT} = process.env
const {NODE_ENV} = process.env
const {JWT_SECRET_KEY} = process.env
const {LOGGER_LEVEL} = process.env
const AUTH_MODE= process.env.AUTH_MODE === 'true'

const { POSTGRES_HOST } = process.env
const { POSTGRES_PORT } = process.env
const { POSTGRES_USER } = process.env
const { POSTGRES_PASSWORD } = process.env
const { POSTGRES_DB } = process.env


export {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  AUTH_MODE,
  LOGGER_LEVEL,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
};
