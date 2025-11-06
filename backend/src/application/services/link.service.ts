import type { CreateLinkInput } from '@/domain/repositories/link.repository'
import type LinkRepository from '@/domain/repositories/link.repository'

export default class LinkService implements LinkRepository {
  constructor(private repo: LinkRepository) {}

  async create(data: CreateLinkInput) {
    return await this.repo.create(data)
  }
}
