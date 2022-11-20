import { Company } from '@/domain/models'
import { User } from '@/domain/models'

export interface CreateCompanyRepository {
  create: (company: Company) => Promise<string | undefined>
}

export interface FindCompanyRepository {
  findCompanyByName: (companyName: string) => Promise<Company>
}

export interface CreateUserRepository {
  createUser: (user: User) => void
}
