import { gql } from '@apollo/client'
import { Category, Selection, User } from './shared-types'

// Fragments
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
const GetUsersFragment = gql`
  fragment GetUsersFragment on Query {
    users {
      id
      name
      email
      admin
      paid
      selections {
        id
        userId
        categoryId
        nomineeId
      }
    }
  }
`

const GetMeFragment = gql`
  fragment GetMeFragment on Query {
    me {
      id
      name
      email
      paid
    }
  }
`

// Queries

// export const GET_CATEGORIES = gql`
//   query GetCategories {
//     ...GetCategoriesFragment
//   }
//   ${GetCategoriesFragment}
// `

export const GET_MY_SELECTIONS = gql`
  query GetMySelections {
    ...GetMySelectionsFragment
  }
  ${GetMySelectionsFragment}
`

export const GET_USERS = gql`
  query GetUsers {
    ...GetUsersFragment
  }
  ${GetUsersFragment}
`
export const GET_CATEGORIES_AND_USERS = gql`
  query GetCategoriesAndUsers {
    ...GetCategoriesFragment
    ...GetUsersFragment
  }
  ${GetCategoriesFragment}
  ${GetUsersFragment}
`
export const GET_CATEGORIES_AND_MY_SELECTIONS_AND_ME = gql`
  query GetCategoriesAndMySelections {
    ...GetCategoriesFragment
    ...GetMySelectionsFragment
    ...GetMeFragment
  }
  ${GetCategoriesFragment}
  ${GetMySelectionsFragment}
  ${GetMeFragment}
`

// Res Types
export interface GetCategoriesRes {
  categories: Category[]
}

export interface GetUsersRes {
  users: User[]
}

export type GetCategoriesAndUsersRes = GetUsersRes & GetCategoriesRes

export interface GetMySelectionsRes {
  mySelections: Selection[]
}
export interface GetMeRes {
  me: User
}

export type GetCategoriesAndMySelectionsAndMeRes = GetCategoriesRes &
  GetMySelectionsRes &
  GetMeRes
