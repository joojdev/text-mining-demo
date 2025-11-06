import type Skill from '@/domain/entities/skill.entity'

export interface CreateSkillInput {
  label: string
}

export default interface SkillRepository {
  create(data: CreateSkillInput): Promise<Skill>
}
