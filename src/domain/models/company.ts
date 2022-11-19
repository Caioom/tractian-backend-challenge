import { User, CompanyUnit } from '@/domain/models'

export class Company {
  companyId?: string
  companyName: string
  users: User[]
  units: CompanyUnit[]

  constructor (companyName: string, user: User, companyId?: string) {
    this.companyName = companyName
    this.users = [ user ]
    this.units = []
    this.companyId = companyId
  }
}

