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

  it('should throw an error if the Company have an empty name', () => {
    const company = new Company('', new User())

    expect(() => sut.create({ company })).toThrow(new CompanyCreationError('It should have a name'))
  })

  it('should throw an error if the Company have an undefined name', () => {
    const company = new Company(undefined as unknown as string, new User())

    expect(() => sut.create({ company })).toThrow(new CompanyCreationError('It should have a name'))
  })

  it('should throw an error if the Company have a null name', () => {
    const company = new Company(null as unknown as string, new User())

    expect(() => sut.create({ company })).toThrow(new CompanyCreationError('It should have a name'))
  })

  it('should call CompanyRepository to save a new Company', () => {
    const company = new Company('any_company_name', new User())

    sut.create({ company })

    expect(companyRepository.createCompany).toHaveBeenCalledWith(company)
  })
})
