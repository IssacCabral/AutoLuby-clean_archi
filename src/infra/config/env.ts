import env from 'dotenv'

env.config()

export default {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  SECRET: process.env.SECRET
}