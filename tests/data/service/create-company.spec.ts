import { mock, MockProxy } from 'jest-mock-extended'


class User {

}

class CompanyUnit {

}

class Company {
  companyName: string
  users: User[]
  units: CompanyUnit[]

  constructor (companyName: string, user: User) {
    this.companyName = companyName
    this.users = [ user ]
    this.units = []
  }
}

namespace CompanyNamespace {
  export type parameters = {
    company: Company
  }
}

class CompanyCreationService {
  constructor (private readonly companyRepository: CompanyRepository) {}

  create ({ company }: CompanyNamespace.parameters): void {
    if (company.companyName === '' || company.companyName === undefined || company.companyName === null) {
      throw new CompanyCreationError('It should have a name')
    }
    this.companyRepository.createCompany(company)
  }
}

interface CompanyRepository {
  createCompany (company: Company): void
}

class CompanyCreationError extends Error {
  constructor (message: string) {
    super(message)
  }
}

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
