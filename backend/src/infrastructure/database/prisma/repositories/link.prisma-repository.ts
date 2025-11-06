import type Link from '@/domain/entities/link.entity'
import type { CreateLinkInput } from '@/domain/repositories/link.repository'
import type LinkRepository from '@/domain/repositories/link.repository'
import { prisma } from '@/infrastructure/database/prisma'
import { v4 } from 'uuid'

export default class LinkPrismaRepository implements LinkRepository {
  async create(data: CreateLinkInput) {
    return (await prisma.link.create({
      data: {
        id: v4(),
        type: data.type,
        url: data.url,
        resume_id: data.resume_id,
      },
    })) as Link
  }
}
