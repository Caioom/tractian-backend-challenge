import { Company } from '@/domain/models'
import { CompanyCreationError } from '@/data/error'
import { CompanyRepository } from '@/data/contracts'

namespace CompanyNamespace {
  export type parameters = {
    company: Company
  }
}

export class CompanyCreationService {
  constructor (private readonly companyRepository: CompanyRepository) {}

  create ({ company }: CompanyNamespace.parameters): void {
    if (company.companyName === '' || company.companyName === undefined || company.companyName === null) {
      throw new CompanyCreationError('It should have a name')
    }
    this.companyRepository.createCompany(company)
  }
}
