import type ApplicationState from '@/domain/enum/application-state.enum'

export default class Application {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public resume_path: string,
    public state: ApplicationState,
  ) {}
}
