import type Resume from '@/domain/entities/resume.entity'
import type { CreateResumeInput } from '@/domain/repositories/resume.repository'
import type ResumeRepository from '@/domain/repositories/resume.repository'
import { prisma } from '@/infrastructure/database/prisma'
import { v4 } from 'uuid'

export default class ResumePrismaRepository implements ResumeRepository {
  async create(data: CreateResumeInput) {
    return (await prisma.resume.create({
      data: {
        id: v4(),
        education: data.education,
        experience: data.experience,
        location: data.location,
        phone: data.phone,
        presentation_letter: data.presentation_letter,
        score: data.score,
        application_id: data.application_id,
      },
    })) as Resume
  }
}
