import type Application from '@/domain/entities/application.entity'
import type {
  CreateApplicationInput,
  GetApplicationByEmail,
} from '@/domain/repositories/application.repository'
import type ApplicationRepository from '@/domain/repositories/application.repository'
import { prisma } from '@/infrastructure/database/prisma'
import { v4 } from 'uuid'

export default class ApplicationPrismaRepository
  implements ApplicationRepository
{
  async create(data: CreateApplicationInput) {
    return (await prisma.application.create({
      data: {
        id: v4(),
        name: data.name,
        email: data.email,
        resume_path: data.resume_path,
      },
    })) as Application
  }

  async getAll() {
    return (await prisma.application.findMany()) as Application[]
  }

  async getByEmail(data: GetApplicationByEmail) {
    return (await prisma.application.findUnique({
      where: {
        email: data.email,
      },
    })) as Application
  }
}
