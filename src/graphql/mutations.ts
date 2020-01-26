import { gql } from '@apollo/client'

export interface MakeSelectionRes {
  makeSelection: {
    id: number
    userId: number
    categoryId: number
    nomineeId: number
  }
}

export interface MakeSelectionVars {
  categoryId: number
  nomineeId: number
}

export const MAKE_SELECTION = gql`
  mutation MakeSelection($categoryId: Int!, $nomineeId: Int!) {
    makeSelection(categoryId: $categoryId, nomineeId: $nomineeId) {
      id
      userId
      categoryId
      nomineeId
    }
  }
`

export interface SetWinnerRes {
  setWinner: {
    id: number
    winnerId: number
  }
}

export interface SetWinnerVars {
  categoryId: number
  nomineeId: number | null
}

export const SET_WINNER = gql`
  mutation PickWinner($categoryId: Int!, $nomineeId: Int) {
    setWinner(categoryId: $categoryId, nomineeId: $nomineeId) {
      id
      winnerId
    }
  }
`

export interface LoginRes {
  login: string
}

export interface LoginVars {
  email: string
  password: string
}

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

export interface SignupRes {
  signup: string
}

export interface SignupVars {
  name: string
  email: string
  password: string
}

export const SIGNUP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password)
  }
`
