import { CreateCompany } from '@/domain/feature'
import { CompanyCreationError } from '@/data/error'
import { CreateCompanyRepository, FindCompanyRepository } from '@/data/contracts'

export class CompanyCreationService implements CreateCompany {
  constructor (
    private readonly companyRepository: CreateCompanyRepository & FindCompanyRepository
  ) {}

  async create ({ company }: CreateCompany.parameters): Promise<any> {
    const existingCompany = await this.companyRepository.findCompanyByName(company.companyName)
    if (existingCompany) {
      throw new CompanyCreationError('This company name is already in use')
    }
    this.companyRepository.create(company)
  }
}
