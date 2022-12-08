import mongoose from 'mongoose'

export class MongoDatabaseConfig {
  private connection: any

  constructor () {
    mongoose.connect('mongodb+srv://tractian-user:12345@tractian-backend-test.1r7yw2r.mongodb.net/test')
    const database = mongoose.connection
    database.on('error', (error) => {
      console.log(`Error connecting to MongoDb ${error}`)
    })

    database.on('connected', () => {
      console.log('Connected to MongoDb')
      this.connection = database
    })
  }

  getConnection (): any {
    return this.connection
  }
}
