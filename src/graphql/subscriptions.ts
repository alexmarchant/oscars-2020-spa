import { gql } from '@apollo/client'
import { Category } from './shared-types'

export interface CategoryUpdatedRes {
  categoryUpdated: Category
}

export const CATEGORY_UPDATED = gql`
  subscription CategoryUpdated {
    categoryUpdated {
      id
      winnerId
    }
  }
`
