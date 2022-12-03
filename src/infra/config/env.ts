import env from 'dotenv'

env.config()

export default {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  DB_CONNECTION: process.env.DB_CONNECTION
}