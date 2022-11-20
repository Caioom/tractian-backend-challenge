import { User, CompanyUnit } from '@/domain/models'

export class Company {
  companyName: string
  users: User[]
  units: CompanyUnit[]

  constructor (companyName: string, user: User) {
    this.companyName = companyName
    this.users = [ user ]
    this.units = []
  }
}

