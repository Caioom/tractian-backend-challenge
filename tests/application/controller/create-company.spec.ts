import { CreateCompany } from '@/domain/feature'
import { User } from '@/domain/models'
import { CreateCompanyController } from '@/application/controller'
import { CreateUser } from '@/data/contracts'

import { MockProxy, mock } from 'jest-mock-extended'

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
