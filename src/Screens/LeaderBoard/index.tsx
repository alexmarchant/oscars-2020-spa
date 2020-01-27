import React from 'react'
import { useQuery, useSubscription } from '@apollo/client'
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
  const sortedUsers = data.users.concat().sort((a, b) => {
    const aScore = userScoreMap[a.id]
    const bScore = userScoreMap[b.id]
    if (aScore > bScore) return -1
    if (aScore < bScore) return 1
    return 0
  })

  return (
    <ul>
      {sortedUsers.map(user => {
        return (
          <li key={user.id}>
            {user.name} - {userScoreMap[user.id]}
          </li>
        )
      })}
    </ul>
  )
}

export default LeaderBoard
