import { CreateUser } from '@/domain/feature'
import { User } from '@/domain/models'

import { mock, MockProxy } from 'jest-mock-extended'

export class CreateUserService implements CreateUser {
  constructor (private readonly createUserRepository: CreateUserRepository) {}

  create(parameters: CreateUser.parameters): void {
    this.createUserRepository.createUser(parameters.user)
  }

}

export interface CreateUserRepository {
  createUser: (user: User) => void
}

describe('CreateUserService', () => {
  let userRepo: MockProxy<CreateUserRepository>
  let sut: CreateUserService

  beforeAll(() => {
    userRepo = mock()
  })

  beforeEach(() => {
    sut = new CreateUserService(userRepo)
  })

  it('should call CreateUserRepository with correct params', () => {
    const user = new User()

    sut.create({ user })

    expect(userRepo.createUser).toHaveBeenCalledWith(user)
  })
})
