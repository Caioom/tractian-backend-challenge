import { CompanyCreationService } from '@/data/service'
import { Company, User } from '@/domain/models'
import { CompanyCreationError } from '@/data/error'
import { FindCompanyRepository, CreateCompanyRepository } from '@/data/contracts'

import { mock, MockProxy } from 'jest-mock-extended'

describe('CompanyCreationService', () => {
  let sut: CompanyCreationService
  let companyRepository: MockProxy<CreateCompanyRepository & FindCompanyRepository>
  let company: Company

  beforeAll(() => {
    companyRepository = mock()
    company = new Company('any_company_name', new User())
  })

  beforeEach(() => {
    sut = new CompanyCreationService(companyRepository)
  })

  it('should call CreateCompanyRepository to save a new Company', async () => {
    await sut.create({ company })

    expect(companyRepository.create).toHaveBeenCalledWith(company)
  })

  it('should not save a new company if there is another one with the same name', async () => {
    const newCompany = new Company('any_company_name', new User())
    companyRepository.findCompanyByName.mockResolvedValueOnce(company)

    const promise = sut.create({ company: newCompany })

    await expect(promise).rejects.toThrow(new CompanyCreationError('This company name is already in use'))
  })
})
