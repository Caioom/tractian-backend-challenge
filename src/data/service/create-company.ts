import { CreateCompany } from '@/domain/feature'
import { CompanyCreationError } from '@/data/error'
import { CompanyRepository } from '@/data/contracts'

export class CompanyCreationService implements CreateCompany {
  constructor (private readonly companyRepository: CompanyRepository) {}

  create ({ company }: CreateCompany.parameters): void {
    if (company.companyName === '' || company.companyName === undefined || company.companyName === null) {
      throw new CompanyCreationError('It should have a name')
    }
    this.companyRepository.create(company)
  }
}
