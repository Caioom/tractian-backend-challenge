import { Company } from '@/domain/models'

export interface CreateCompany {
  create (parameters: CreateCompany.parameters): void
}

export namespace CreateCompany {
  export type parameters = {
    company: Company
  }
}
