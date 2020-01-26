import React from 'react'
import { useQuery } from '@apollo/client'
import {
  GET_CATEGORIES_AND_USERS,
  GetCategoriesAndUsersRes,
} from '../../graphql/queries'

const LeaderBoard: React.FC = () => {
  const { loading, error, data } = useQuery<GetCategoriesAndUsersRes>(
    GET_CATEGORIES_AND_USERS,
  )

  if (loading || !data) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  console.log(GET_CATEGORIES_AND_USERS)

  return (
    <ul>
      {data.users.map(user => (
        <li>{user.name}</li>
      ))}
    </ul>
  )
}

export default LeaderBoard
