import Express from 'express'
import http from 'http'
import env from '@/infrastructure/config'

const expressApp = Express()
const httpServer = http.createServer(expressApp)



httpServer.listen(env.PORT, () => {
  console.log(`API Server is listening on port ${env.PORT}!`)
})
