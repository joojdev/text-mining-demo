import { Router } from 'express'
import ApplicationPrismaRepository from '../database/prisma/repositories/application.prisma-repository'
import ApplicationService from '@/application/services/application.service'
import z from 'zod'
import { badRequest, created, upload } from '@/infrastructure/server'
import fs from 'fs'
import { promisify } from 'util'
const unlinkAsync = promisify(fs.unlink)

const applicationRouter = Router()
const applicationRepository = new ApplicationPrismaRepository()
const applicationService = new ApplicationService(applicationRepository)

applicationRouter.get('/', async (request, response) => {
  const applications = await applicationService.getAll()
  return response.json(applications)
})

const CreateApplicationSchema = z.object({
  name: z.string(),
  email: z.email(),
})

applicationRouter.post(
  '/',
  upload.single('file'),
  async (request, response) => {
    const parsed = CreateApplicationSchema.safeParse(request.body)

    if (!request.file) return badRequest(response, 'Arquivo não existente')

    if (!parsed.success) return badRequest(response, 'Dados inválidos')

    if (await applicationService.existsByEmail({ email: parsed.data.email })) {
      await unlinkAsync(request.file.path)
      return badRequest(response, 'Já existe uma aplicação com este e-mail')
    }

    const application = await applicationService.create({
      name: parsed.data.name,
      email: parsed.data.email,
      resume_path: request.file.path,
    })

    return created(response, application)
  },
)

export default applicationRouter
