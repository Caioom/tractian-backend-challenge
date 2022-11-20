import { CreateCompany } from '@/domain/feature'
import { User, CompanyUnit, Company } from '@/domain/models'

import { MockProxy, mock } from 'jest-mock-extended'

export class CreateUser {
  create (parameters: CreateUser.parameters): void {

  }
}

export namespace CreateUser {
  export type parameters = {
    user: User
  }
}

export class CreateCompanyController {
  constructor (
    private readonly companyService: CreateCompany,
    private readonly createUser: CreateUser
  ) {}
  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (httpRequest.company_name === '' || httpRequest.company_name === null || httpRequest.company_name === undefined) {
      return { statusCode: '400', message: 'Insert a valid name for your company' }
    }
    const company = new Company(httpRequest.company_name, httpRequest.user)
    const companyId = await this.companyService.create({ company })
    if (companyId) {
      this.createUser.create({ user: { name: httpRequest.user.name, companyId } })
    }
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
  let createUser: MockProxy<CreateUser>
  let user: User
  let sut: CreateCompanyController

  beforeAll(() => {
    createCompany = mock()
    createUser = mock()
  })

  beforeEach(() => {
    user = { name: 'any_username' }
    sut = new CreateCompanyController(createCompany, createUser)
  })

  it('should not insert a company with an empty name', async () => {
    const response = await sut.handler({ company_name: '', user, units: []})

    expect(response).toEqual({
      statusCode: '400',
      message: 'Insert a valid name for your company'
    })
  })

  it('should not insert a company with a null name', async () => {
    const response = await sut.handler({ company_name: null as unknown as string, user, units: []})

    expect(response).toEqual({
      statusCode: '400',
      message: 'Insert a valid name for your company'
    })
  })

  it('should not insert a company with an undefined name', async () => {
    const response = await sut.handler({ company_name: undefined as unknown as string, user, units: []})

    expect(response).toEqual({
      statusCode: '400',
      message: 'Insert a valid name for your company'
    })
  })

  it('should call CompanyCreationService with correct params', async () => {
    const expectedCompany = {
      companyName: 'any_company_name',
      users: [ user ],
      units: []
    }

    await sut.handler({ company_name: 'any_company_name', user, units: []})

    expect(createCompany.create).toHaveBeenCalledWith({ company: expectedCompany })
  })

  it('should return a 200 ok response for a valid company data', async () => {
    const response = await sut.handler({ company_name: 'any_company_name', user, units: []})

    expect(response).toEqual({
      statusCode: '200',
      message: 'ok'
    })
  })

  it('should call when CreateCompany succeed CreateUser with correct params', async () => {
    createCompany.create.mockResolvedValue('1')

    await sut.handler({ company_name: 'any_company_name', user, units: []})

    user.companyId = '1'
    expect(createUser.create).toHaveBeenCalledWith({ user })
  })
})
