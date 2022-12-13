import { addAlias } from 'module-alias'
import { resolve } from 'path'
import express from 'express'
import { MongoClient } from 'mongodb'

addAlias('@', resolve('build'))

import { CreateCompanyRepoMongoDb } from '@/infra/repository'
import { MongoDatabaseConfig } from '@/main/config'
import { User, Company } from '@/domain/models'

const app = express()
app.use(express.json())
app.listen(3000, () => {
  const mongoClient = new MongoClient('mongodb+srv://tractian-user:12345@tractian-backend-test.1r7yw2r.mongodb.net/test')
  const companyRepo = new CreateCompanyRepoMongoDb(mongoClient)
  companyRepo.create(new Company('test_company', new User('caio')))
  console.log('Server started 3000')
})
