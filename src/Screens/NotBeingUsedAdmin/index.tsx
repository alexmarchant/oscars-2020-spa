import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CATEGORIES, GetCategoriesRes } from '../../graphql/queries'
import {
  SET_WINNER,
  SetWinnerRes,
  SetWinnerVars,
} from '../../graphql/mutations'
import { Category, Nominee } from '../../graphql/shared-types'
import CategoryComponent from '../Ballot/Category'

const Admin: React.FC = () => {
  const { loading, error, data } = useQuery<GetCategoriesRes>(GET_CATEGORIES)
  const [setWinner] = useMutation<SetWinnerRes, SetWinnerVars>(SET_WINNER)

  function setWinnerToggle({ variables }: { variables: SetWinnerVars }) {
    if (!data) return
    const category = data.categories.find(
      category => category.id === variables.categoryId,
    )
    // If nominee is already selected, then toggle it off
    if (category?.winnerId === variables.nomineeId) {
      variables.nomineeId = null
    }
    setWinner({ variables })
  }

  function isSelected(category: Category, nominee: Nominee): boolean {
    if (!data) return false
    return category.winnerId === nominee.id
  }

  function isWinner(nominee: Nominee): boolean {
    if (!data) return false
    return data.categories.some(category => category.winnerId === nominee.id)
  }

  function categoryComplete(category: Category): boolean {
    return false
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
          isWinner={isWinner}
          categoryComplete={categoryComplete}
          onClick={setWinnerToggle}
        />
      ))}
    </div>
  )
}

export default Admin
