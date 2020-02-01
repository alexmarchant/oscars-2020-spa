import { gql, DataProxy, FetchResult } from '@apollo/client'
import { GET_MY_SELECTIONS, GetMySelectionsRes } from './queries'
import { Selection } from './shared-types'

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

// Update the cache manually after a selection
export function makeSelectionCallback(
  cache: DataProxy,
  mutationResult: FetchResult<MakeSelectionRes>,
): void {
  // Get the new selection from the makeSelection mutation
  const newSelection = mutationResult.data?.makeSelection
  if (!newSelection) {
    throw new Error('Bad result')
  }

  // Get the cache for the query we used on this page
  const queryRes = cache.readQuery<GetMySelectionsRes>({
    query: GET_MY_SELECTIONS,
  })
  if (!queryRes) {
    throw new Error('Bad result')
  }
  const { mySelections } = queryRes

  // Filter out selections with same cat id... can only select
  // one nominee from each cat, so we just remove old ones
  const filteredSelections = mySelections.filter((selection: Selection) => {
    return selection.categoryId !== newSelection.categoryId
  })

  // Add new selection
  const newMySelections = filteredSelections.concat([newSelection])

  // Save updated data to cache using writeQuery
  cache.writeQuery({
    query: GET_MY_SELECTIONS,
    data: { mySelections: newMySelections },
  })
}

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

export interface UpdateUserRes {
  id: number
  name: string
  email: string
  paid: boolean
}

export interface UpdateUserVars {
  value: boolean
}

export const UPDATE_USER = gql`
  mutation UpdateUser($value: Boolean!) {
    updateUser(value: $value) {
      id
      name
      email
      paid
    }
  }
`
