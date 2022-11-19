import { CreateCompany } from '@/domain/feature'
import { CompanyCreationError } from '@/data/error'
import { CompanyRepository } from '@/data/contracts'
import { Company } from '@/domain/models'

export class CompanyCreationService implements CreateCompany {
  constructor (private readonly companyRepository: CompanyRepository) {}

  async create ({ company }: CreateCompany.parameters): Promise<any> {
    if (company.companyName === '' || company.companyName === undefined || company.companyName === null) {
      throw new CompanyCreationError('It should have a name')
    }
    const existingCompany = await this.companyRepository.findCompanyByName(company.companyName)
    if (existingCompany) {
      throw new CompanyCreationError('This company name is already in use')
    }
    this.companyRepository.create(company)
  }
}
