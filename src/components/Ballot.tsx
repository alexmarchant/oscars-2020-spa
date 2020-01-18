import React from 'react'
import { useQuery, gql } from '@apollo/client'

interface Category {
  id: number
  title: string
  value: number
  nominees: Nominee[]
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

  if (loading || !data) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>

  return (
    <div>
      {data.categories.map(category => (
        <div>
          <div>
            {category.title} - {category.value}
          </div>
          <ul>
            {category.nominees.map(nominee => (
              <li>
                {nominee.name} - {nominee.film}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Ballot
