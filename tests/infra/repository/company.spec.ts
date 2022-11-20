import { CreateCompanyRepository } from '@/data/contracts'
import { Company, User } from '@/domain/models'

import { MongoClient, Db as MongoDb, Collection as MongoCollection} from 'mongodb'
import { mock, MockProxy } from 'jest-mock-extended'

export class CreateCompanyRepoMongoDb implements CreateCompanyRepository {
  constructor (private readonly mongoClient: MongoClient) {}

  async create (company: Company): Promise<string | undefined> {
    const result = await this.mongoClient.db('tractian-challenge').collection('companies').insertOne(company)
    if (result) {
      return result.insertedId.toString()
    }
    return undefined
  }
}

describe('CreateCompanyRepoMongoDb', () => {
  let mongoClient: MockProxy<MongoClient>
  let mongoDb: MockProxy<MongoDb>
  let mongoCollection: MockProxy<MongoCollection>
  let sut: CreateCompanyRepoMongoDb
  let company: Company

  beforeAll(() => {
    mongoClient = mock()
    mongoDb = mock()
    mongoCollection = mock()
    mongoClient.db.mockReturnValue(mongoDb)
    mongoDb.collection.mockReturnValue(mongoCollection)
  })

  beforeEach(() => {
    sut = new CreateCompanyRepoMongoDb(mongoClient)
    company = new Company('any_company_name', new User())
  })

  it('should return undefined for failure on insert', async () => {
    const result = await sut.create(new Company('any_company_name', new User()))

    expect(result).toBeUndefined()
  })

  it('should call db with correct params', async () => {
    await sut.create(company)

    expect(mongoClient.db).toHaveBeenCalledWith('tractian-challenge')
  })

  it('should call collection with correct params', async () => {
    await sut.create(company)

    expect(mongoDb.collection).toHaveBeenCalledWith('companies')
  })

  it('should call insertOne with correct params', async () => {
    await sut.create(company)

    expect(mongoCollection.insertOne).toHaveBeenCalledWith(company)
  })

  it('should return insertId from new created document', async () => {
    jest.mocked(mongoCollection).insertOne.mockImplementationOnce(jest.fn().mockImplementation(() => ({
      insertedId: '1'
    })))

    const insertId = await sut.create(company)

    expect(insertId).toBe('1')
  })

})
