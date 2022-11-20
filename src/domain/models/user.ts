export class User {
  name?: string
  companyId?: string

  constructor (name?: string, companyId?: string) {
    this.name = name
    this.companyId = companyId
  }
}
