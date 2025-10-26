import Express from 'express'
import http from 'http'
import env from '@/infrastructure/config'
import applicationRouter from '@/infrastructure/routes/application.router'

const expressApp = Express()
const httpServer = http.createServer(expressApp)

expressApp.use(Express.json())
expressApp.use(Express.urlencoded({ extended: true }))

expressApp.use('/application', applicationRouter)

httpServer.listen(env.PORT, () => {
  console.log(`API Server is listening on port ${env.PORT}!`)
})
