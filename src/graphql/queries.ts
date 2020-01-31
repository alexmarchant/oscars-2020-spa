import { gql } from '@apollo/client'
import { Category, Selection, User } from './shared-types'

export interface GetCategoriesRes {
  categories: Category[]
}

const GetCategoriesFragment = gql`
  fragment GetCategoriesFragment on Query {
    categories {
      id
      title
      value
      winnerId
      nominees {
        id
        name
        film
        imageURL
      }
    }
  }
`

export const GET_CATEGORIES = gql`
  query GetCategories {
    ...GetCategoriesFragment
  }
  ${GetCategoriesFragment}
`

export interface GetMySelectionsRes {
  mySelections: Selection[]
}

const GetMySelectionsFragment = gql`
  fragment GetMySelectionsFragment on Query {
    mySelections {
      id
      userId
      categoryId
      nomineeId
    }
  }
`

export const GET_MY_SELECTIONS = gql`
  query GetMySelections {
    ...GetMySelectionsFragment
  }
  ${GetMySelectionsFragment}
`

export type GetCategoriesAndMySelectionsRes = GetCategoriesRes &
  GetMySelectionsRes

export const GET_CATEGORIES_AND_MY_SELECTIONS = gql`
  query GetCategoriesAndMySelections {
    ...GetCategoriesFragment
    ...GetMySelectionsFragment
  }
  ${GetCategoriesFragment}
  ${GetMySelectionsFragment}
`

export interface GetUsersRes {
  users: User[]
}

const GetUsersFragment = gql`
  fragment GetUsersFragment on Query {
    users {
      id
      name
      email
      admin
      selections {
        id
        userId
        categoryId
        nomineeId
      }
    }
  }
`

export const GET_USERS = gql`
  query GetUsers {
    ...GetUsersFragment
  }
  ${GetUsersFragment}
`

export type GetCategoriesAndUsersRes = GetUsersRes & GetCategoriesRes

export const GET_CATEGORIES_AND_USERS = gql`
  query GetCategoriesAndUsers {
    ...GetCategoriesFragment
    ...GetUsersFragment
  }
  ${GetCategoriesFragment}
  ${GetUsersFragment}
`
