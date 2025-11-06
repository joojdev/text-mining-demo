import type Resume from '@/domain/entities/resume.entity'

export interface CreateResumeInput {
  application_id: string
  experience: number
  phone: string
  location: string
  education: string
  presentation_letter: string
  score: number
}

export default interface ResumeRepository {
  create(data: CreateResumeInput): Promise<Resume>
}
