import type Link from '@/domain/entities/link.entity'
import type LinkType from '@/domain/enum/link-type.enum'

export interface CreateLinkInput {
  url: string
  type: LinkType
  resume_id: string
}

export default interface LinkRepository {
  create(data: CreateLinkInput): Promise<Link>
}
