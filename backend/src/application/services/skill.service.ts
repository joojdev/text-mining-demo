import type { CreateSkillInput } from '@/domain/repositories/skill.repository'
import type SkillRepository from '@/domain/repositories/skill.repository'

export default class SkillService implements SkillRepository {
  constructor(private repo: SkillRepository) {}

  async create(data: CreateSkillInput) {
    return await this.repo.create(data)
  }
}
