import { Company } from '@/domain/models'

export interface ObjectIdGenerator {
  fillUpId: (company: Company) => void
}
