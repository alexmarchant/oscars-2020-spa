import React from 'react'
import { useQuery, useMutation, DataProxy, FetchResult } from '@apollo/client'
import CategoryComponent from './Category'

import {
  Category,
  Nominee,
  Selection,
  GetCategoriesAndMySelectionsRes,
  MakeSelectionRes,
  MakeSelectionVars,
} from './interfaces'

import { query, mutation } from './graphql'

// Update the cache manually after a selection
function makeSelectionCallback(
  cache: DataProxy,
  mutationResult: FetchResult<MakeSelectionRes>,
): void {
  // Get the new selection from the makeSelection mutation
  const newSelection = mutationResult.data?.makeSelection
  if (!newSelection) {
    throw new Error('Bad result')
  }

  // Get the cache for the query we used on this page
  const queryRes = cache.readQuery<GetCategoriesAndMySelectionsRes>({
    query: query.GET_CATEGORIES_AND_MY_SELECTIONS,
  })
  if (!queryRes) {
    throw new Error('Bad result')
  }
  const { categories, mySelections } = queryRes

  // Filter out selections with same cat id... can only select
  // one nominee from each cat, so we just remove old ones
  const filteredSelections = mySelections.filter((selection: Selection) => {
    return selection.categoryId !== newSelection.categoryId
  })

  // Add new selection
  const newMySelections = filteredSelections.concat([newSelection])

  // Save updated data to cache using writeQuery
  cache.writeQuery({
    query: query.GET_CATEGORIES_AND_MY_SELECTIONS,
    data: { categories, mySelections: newMySelections },
  })
}

const Ballot: React.FC = () => {
  const { loading, error, data } = useQuery<GetCategoriesAndMySelectionsRes>(
    query.GET_CATEGORIES_AND_MY_SELECTIONS,
  )
  const [makeSelection] = useMutation<MakeSelectionRes, MakeSelectionVars>(
    mutation.MAKE_SELECTION,
    { update: makeSelectionCallback },
  )

  function isSelected(category: Category, nominee: Nominee): boolean {
    if (!data) return false
    return data.mySelections.some(
      selection =>
        selection.categoryId === category.id &&
        selection.nomineeId === nominee.id,
    )
  }
  function isWinner(nominee: Nominee): boolean {
    if (!data) return false
    return data.categories.some(category => category.winnerId === nominee.id)
  }

  console.log({ data })

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
          makeSelection={makeSelection}
        />
      ))}
    </div>
  )
}

export default Ballot
