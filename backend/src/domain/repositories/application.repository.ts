import type Application from '@/domain/entities/application.entity'

export interface CreateApplicationInput {
  name: string
  email: string
  resume_path: string
}

export interface GetApplicationByEmail {
  email: string
}

export default interface ApplicationRepository {
  create(data: CreateApplicationInput): Promise<Application>
  getAll(): Promise<Application[]>
  getByEmail(data: GetApplicationByEmail): Promise<Application | null>
}
