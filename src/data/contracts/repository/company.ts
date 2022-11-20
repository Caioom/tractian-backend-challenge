import { Company } from '@/domain/models'

export interface CreateCompanyRepository {
  create: (company: Company) => Promise<string | undefined>
}

export interface FindCompanyRepository {
  findCompanyByName: (companyName: string) => Promise<Company>
}
