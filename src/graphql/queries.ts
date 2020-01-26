import { gql } from '@apollo/client'
import { Category, Selection } from './shared-types'

export interface GetCategoriesAndMySelectionsRes {
  categories: Category[]
  mySelections: Selection[]
}

export const GET_CATEGORIES_AND_MY_SELECTIONS = gql`
  query GetCategoriesAndMySelections {
    categories {
      id
      title
      value
      winnerId
      nominees {
        id
        name
        film
      }
    }
    mySelections {
      id
      userId
      categoryId
      nomineeId
    }
  }
`

export interface GetCategoriesRes {
  categories: Category[]
}

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      title
      value
      winnerId
      nominees {
        id
        name
        film
      }
    }
  }
`
