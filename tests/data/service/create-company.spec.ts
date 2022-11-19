import { CompanyCreationService } from '@/data/service'
import { Company, User } from '@/domain/models'
import { CompanyCreationError } from '@/data/error'
import { CompanyRepository } from '@/data/contracts'

import { mock, MockProxy } from 'jest-mock-extended'

describe('CompanyCreationService', () => {
  let sut: CompanyCreationService
  let companyRepository: MockProxy<CompanyRepository>

  beforeAll(() => {
    companyRepository = mock()
  })

  beforeEach(() => {
    sut = new CompanyCreationService(companyRepository)
  })

  it('should throw an error if the Company have an empty name', async () => {
    const company = new Company('', new User())

    const promise = sut.create({ company })

    await expect(promise).rejects.toThrow(new CompanyCreationError('It should have a name'))
  })

  it('should throw an error if the Company have an undefined name', async () => {
    const company = new Company(undefined as unknown as string, new User())

    const promise = sut.create({ company })

    await expect(promise).rejects.toThrow(new CompanyCreationError('It should have a name'))
  })

  it('should throw an error if the Company have a null name', async () => {
    const company = new Company(null as unknown as string, new User())

    const promise = sut.create({ company })

    await expect(promise).rejects.toThrow(new CompanyCreationError('It should have a name'))
  })

  it('should call CompanyRepository to save a new Company', async () => {
    const company = new Company('any_company_name', new User())

    await sut.create({ company })

    expect(companyRepository.create).toHaveBeenCalledWith(company)
  })

  it('should not save a new company if there is another one with the same name', async () => {
    const newCompany = new Company('any_company_name', new User())
    const existingCompany = new Company('any_company_name', new User())
    companyRepository.findCompanyByName.mockResolvedValue(existingCompany)

    const promise = sut.create({ company: newCompany })

    await expect(promise).rejects.toThrow(new CompanyCreationError('This company name is already in use'))
  })
})
