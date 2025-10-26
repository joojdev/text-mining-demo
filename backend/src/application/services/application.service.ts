import type {
  CreateApplicationInput,
  GetApplicationByEmail,
} from '@/domain/repositories/application.repository'
import type ApplicationRepository from '@/domain/repositories/application.repository'

export default class ApplicationService implements ApplicationRepository {
  constructor(private repo: ApplicationRepository) {}

  async create(data: CreateApplicationInput) {
    return await this.repo.create(data)
  }

  async getAll() {
    return await this.repo.getAll()
  }

  async getByEmail(data: GetApplicationByEmail) {
    return await this.repo.getByEmail(data)
  }

  async existsByEmail(data: GetApplicationByEmail): Promise<boolean> {
    const application = await this.getByEmail(data)

    return !!application
  }
}
