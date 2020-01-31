import React from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { Table, Container } from 'react-bootstrap'
import {
  GET_CATEGORIES_AND_USERS,
  GetCategoriesAndUsersRes,
} from '../../graphql/queries'
import {
  CATEGORY_UPDATED,
  CategoryUpdatedRes,
} from '../../graphql/subscriptions'
import { Category, Selection } from '../../graphql/shared-types'

function userScore(selections: Selection[], categories: Category[]): number {
  return categories.reduce((acc: number, category: Category): number => {
    const selection = selections.find(
      selection => selection.categoryId === category.id,
    )
    if (!selection) return acc
    if (selection.nomineeId === category.winnerId) {
      return acc + category.value
    } else {
      return acc
    }
  }, 0)
}

function userCorrect(selections: Selection[], categories: Category[]): number {
  return categories.reduce((acc: number, category: Category): number => {
    const selection = selections.find(
      selection => selection.categoryId === category.id,
    )
    if (!selection) return acc
    if (selection.nomineeId === category.winnerId) {
      return acc + 1
    } else {
      return acc
    }
  }, 0)
}

const LeaderBoard: React.FC = () => {
  const { loading, error, data } = useQuery<GetCategoriesAndUsersRes>(
    GET_CATEGORIES_AND_USERS,
  )
  useSubscription<CategoryUpdatedRes>(CATEGORY_UPDATED)

  if (loading || !data) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  const userScoreMap: Record<number, number> = data.users.reduce(
    (acc, user) => {
      if (!user.selections) {
        throw new Error('Missing selections')
      }
      acc[user.id] = userScore(user.selections, data.categories)
      return acc
    },
    {} as Record<number, number>,
  )
  const userCorrectMap: Record<number, number> = data.users.reduce(
    (acc, user) => {
      if (!user.selections) {
        throw new Error('Missing selections')
      }
      acc[user.id] = userCorrect(user.selections, data.categories)
      return acc
    },
    {} as Record<number, number>,
  )

  const sortedUsers = data.users.concat().sort((a, b) => {
    const aScore = userScoreMap[a.id]
    const bScore = userScoreMap[b.id]
    if (aScore > bScore) return -1
    if (aScore < bScore) return 1
    return 0
  })

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Correct</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, idx) => {
            return (
              <tr key={user.id}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{userCorrectMap[user.id]}</td>
                <td>{userScoreMap[user.id]}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}

export default LeaderBoard
