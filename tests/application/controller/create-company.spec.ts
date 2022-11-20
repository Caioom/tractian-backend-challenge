import { CreateCompany } from '@/domain/feature'
import { User, CompanyUnit, Company } from '@/domain/models'

import { MockProxy, mock } from 'jest-mock-extended'

export class CreateCompanyController {
  constructor (private readonly companyService: CreateCompany) {}
  handler (httpRequest: HttpRequest): HttpResponse {
    if (httpRequest.company_name === '' || httpRequest.company_name === null || httpRequest.company_name === undefined) {
      return { statusCode: '400', message: 'Insert a valid name for your company' }
    }
    const company = new Company(httpRequest.company_name, httpRequest.user)
    this.companyService.create({ company })
    return { statusCode: '200', message: 'ok' }
  }
}

type HttpResponse = {
  statusCode: string,
  message: string
}

type HttpRequest = {
  company_name: string
  user: User
  units: CompanyUnit[]
}

describe('CreateCompanyController', () => {
  let createCompany: MockProxy<CreateCompany>
  let sut: CreateCompanyController

  beforeAll(() => {
    createCompany = mock()
  })

  beforeEach(() => {
    sut = new CreateCompanyController(createCompany)
  })

  it('should not insert a company with an empty name', () => {
    const response = sut.handler({ company_name: '', user: {}, units: []})

    expect(response).toEqual({
      statusCode: '400',
      message: 'Insert a valid name for your company'
    })
  })

  it('should not insert a company with a null name', () => {
    const response = sut.handler({ company_name: null as unknown as string, user: {}, units: []})

    expect(response).toEqual({
      statusCode: '400',
      message: 'Insert a valid name for your company'
    })
  })

  it('should not insert a company with an undefined name', () => {
    const response = sut.handler({ company_name: undefined as unknown as string, user: {}, units: []})

    expect(response).toEqual({
      statusCode: '400',
      message: 'Insert a valid name for your company'
    })
  })

  it('should call CompanyCreationService with correct params', () => {
    const expectedCompany = {
      companyName: 'any_company_name',
      users: [{}],
      units: []
    }

    sut.handler({ company_name: 'any_company_name', user: {}, units: []})

    expect(createCompany.create).toHaveBeenCalledWith({ company: expectedCompany })
  })

  it('should return a 200 ok response for a valid company data', () => {
    const response = sut.handler({ company_name: 'any_company_name', user: {}, units: []})

    expect(response).toEqual({
      statusCode: '200',
      message: 'ok'
    })
  })
})
