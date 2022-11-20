import { User } from '@/domain/models'

export interface CreateUser {
  create: (parameters: CreateUser.parameters) => void
}

export namespace CreateUser {
  export type parameters = {
    user: User
  }
}
