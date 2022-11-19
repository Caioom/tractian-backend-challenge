import { Company } from '@/domain/models'

export interface CompanyRepository {
  create (company: Company): void
}
