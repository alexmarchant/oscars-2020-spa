import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_CATEGORIES, GetCategoriesRes } from '../../graphql/queries'

const LeaderBoard: React.FC = () => {
  const { loading, error, data } = useQuery<GetCategoriesRes>(GET_CATEGORIES)

  if (loading || !data) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>

  return <div></div>
}

export default LeaderBoard
