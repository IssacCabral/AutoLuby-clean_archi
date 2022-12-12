import app from './config/app'
import env from 'src/infra/config/env'

const SERVER_PORT = env.SERVER_PORT 

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})
console.log('s')