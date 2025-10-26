import { Router } from 'express'
import ApplicationPrismaRepository from '../database/prisma/repositories/application.prisma-repository'
import ApplicationService from '@/application/services/application.service'
import z from 'zod'
import { badRequest, created, upload } from '@/infrastructure/server'

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

    if (!parsed.success) return badRequest(response, 'Dados inválidos')
    if (await applicationService.existsByEmail({ email: parsed.data.email }))
      return badRequest(response, 'Já existe uma aplicação com este e-mail')
    if (!request.file) return badRequest(response, 'Arquivo não existente')
    if (!request.file.filename.endsWith('.pdf'))
      return badRequest(response, 'Formato de arquivo inválido')

    const application = await applicationService.create({
      name: parsed.data.name,
      email: parsed.data.email,
      resume_path: request.file.path,
    })

    return created(response, application)
  },
)

export default applicationRouter
