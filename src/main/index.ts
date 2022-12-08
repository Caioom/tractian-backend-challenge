import { addAlias } from 'module-alias'
import { resolve } from 'path'
import express from 'express'

addAlias('@', resolve('build'))

const app = express()
app.use(express.json())
app.listen(3000, () => {
  console.log('Server started 3000')
})
