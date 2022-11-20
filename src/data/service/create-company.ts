import { CreateCompany } from '@/domain/feature'
import { CompanyCreationError } from '@/data/error'
import { CreateCompanyRepository, FindCompanyRepository, ObjectIdGenerator } from '@/data/contracts'

export class CompanyCreationService implements CreateCompany {
  constructor (
    private readonly companyRepository: CreateCompanyRepository & FindCompanyRepository,
    private readonly objectIdGenerator: ObjectIdGenerator
  ) {}

  async create ({ company }: CreateCompany.parameters): Promise<any> {
    const existingCompany = await this.companyRepository.findCompanyByName(company.companyName)
    if (existingCompany) {
      throw new CompanyCreationError('This company name is already in use')
    }
    this.objectIdGenerator.fillUpId(company)
    this.companyRepository.create(company)
  }
}
