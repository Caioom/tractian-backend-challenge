import { CreateCompanyRepository } from '@/data/contracts'
import { Company } from '@/domain/models'

import { MongoClient } from 'mongodb'

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
