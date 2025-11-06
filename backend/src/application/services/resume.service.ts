import type { CreateResumeInput } from '@/domain/repositories/resume.repository'
import type ResumeRepository from '@/domain/repositories/resume.repository'

export default class ResumeService implements ResumeRepository {
  constructor(private repo: ResumeRepository) {}

  async create(data: CreateResumeInput) {
    return await this.repo.create(data)
  }
}
