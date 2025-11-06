import type Skill from '@/domain/entities/skill.entity'
import type { CreateSkillInput } from '@/domain/repositories/skill.repository'
import type SkillRepository from '@/domain/repositories/skill.repository'
import { prisma } from '@/infrastructure/database/prisma'
import { v4 } from 'uuid'

export default class SkillPrismaRepository implements SkillRepository {
  async create(data: CreateSkillInput) {
    return (await prisma.skill.create({
      data: {
        id: v4(),
        label: data.label,
      },
    })) as Skill
  }
}
