import type LinkType from '@/domain/enum/link-type.enum'

export default class Link {
  constructor(
    public id: string,
    public url: string,
    public type: LinkType,
    public resume_id: string,
  ) {}
}
