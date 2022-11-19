import { Company } from '@/domain/models'

export interface CompanyRepository {
  createCompany (company: Company): void
}
