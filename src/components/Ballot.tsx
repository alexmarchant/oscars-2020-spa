import React from 'react'
import { useQuery, gql } from '@apollo/client'

interface Category {
  id: number
  title: string
  value: number
  nominees: [Nominee]
}

interface Nominee {
  id: number
  name: string
  film: string
}

const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      title
      value
      nominees {
        id
        name
        film
      }
    }
  }
`

const Ballot: React.FC = () => {
  const { loading, error, data } = useQuery<{ categories: Category[] }>(
    GET_CATEGORIES,
  )

  if (loading) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>

  return (
    <div>{data && <pre>{JSON.stringify(data.categories, null, 2)}</pre>}</div>
  )
  // return data && data?.categories.map(category => {
  //   <div>{category.title}</div>
  // })}
}

export default Ballot
