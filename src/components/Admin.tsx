import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { query, mutation } from './Ballot/graphql'
import { Category, Nominee } from './Ballot/interfaces'
import CategoryComponent from './Ballot/Category'

interface GetCategoriesRes {
  categories: Category[]
}

interface SetWinnerRes {
  pickWinners: Category
}

interface SetWinnerVars {
  categoryId: number
  nomineeId: number
}

const Admin: React.FC = () => {
  const { loading, error, data } = useQuery<GetCategoriesRes>(
    query.GET_CATEGORIES,
  )

  const [setWinner] = useMutation<SetWinnerRes, SetWinnerVars>(
    mutation.SET_WINNER,
  )

  function isSelected(category: Category, nominee: Nominee): boolean {
    if (!data) return false
    return category.winnerId === nominee.id
  }

  if (loading || !data) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <div>
      {data.categories.map(category => (
        <CategoryComponent
          key={category.id}
          category={category}
          isSelected={isSelected}
          makeSelection={setWinner}
        />
      ))}
    </div>
  )
}

export default Admin
