export class Asset {
  id: string
  name: string
  image: string
  description: string
  model: string
  owner: string
  status: string
  health_level: string

  constructor () {
    this.id = ''
    this.name = ''
    this.image = ''
    this.description = ''
    this.model = ''
    this.owner = ''
    this.status = ''
    this.health_level = ''
  }
}
