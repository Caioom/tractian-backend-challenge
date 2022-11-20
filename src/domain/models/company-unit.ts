import { Asset } from '@/domain/models'

export class CompanyUnit {
  assets: Asset[]

  constructor () {
    this.assets = []
  }
}
