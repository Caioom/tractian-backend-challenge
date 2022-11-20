import { CreateCompany } from '@/domain/feature'
import { User, CompanyUnit, Company } from '@/domain/models'
import { CreateUser } from '@/data/contracts'

type HttpResponse = {
  statusCode: string,
  message: string
}

type HttpRequest = {
  company_name: string
  user: User
  units: CompanyUnit[]
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
