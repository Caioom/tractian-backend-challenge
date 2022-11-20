import { Company } from '@/domain/models'

export interface CreateCompany {
  create (parameters: CreateCompany.parameters): Promise<string | undefined>
}

export namespace CreateCompany {
  export type parameters = {
    company: Company
  }
}
