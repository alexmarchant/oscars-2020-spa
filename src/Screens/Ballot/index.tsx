import React from 'react'
import {
  useQuery,
  useMutation,
  DataProxy,
  FetchResult,
  useSubscription,
} from '@apollo/client'
import { useLocation } from 'react-router-dom'
import CategoryComponent from './Category'
import { Category, Nominee, Selection } from '../../graphql/shared-types'
import {
  GET_CATEGORIES_AND_MY_SELECTIONS,
  GetCategoriesAndMySelectionsRes,
} from '../../graphql/queries'
import {
  MAKE_SELECTION,
  SET_WINNER,
  MakeSelectionRes,
  MakeSelectionVars,
  SetWinnerRes,
  SetWinnerVars,
} from '../../graphql/mutations'
import {
  CATEGORY_UPDATED,
  CategoryUpdatedRes,
} from '../../graphql/subscriptions'

enum Mode {
  Admin,
  NonAdmin,
}

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
    query: GET_CATEGORIES_AND_MY_SELECTIONS,
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
    query: GET_CATEGORIES_AND_MY_SELECTIONS,
    data: { categories, mySelections: newMySelections },
  })
}

const Ballot: React.FC = () => {
  let location = useLocation()

  const { pathname } = location

  const mode: Mode = pathname === '/admin' ? Mode.Admin : Mode.NonAdmin

  const { loading, error, data } = useQuery<GetCategoriesAndMySelectionsRes>(
    GET_CATEGORIES_AND_MY_SELECTIONS,
  )

  const [makeSelection] = useMutation<MakeSelectionRes, MakeSelectionVars>(
    MAKE_SELECTION,
    { update: makeSelectionCallback },
  )

  const [setWinner] = useMutation<SetWinnerRes, SetWinnerVars>(SET_WINNER)

  useSubscription<CategoryUpdatedRes>(CATEGORY_UPDATED)

  if (loading || !data) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>

  // onClicks
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

  const onClick = mode === Mode.Admin ? setWinnerToggle : makeSelection

  return (
    <div>
      {data.categories.map(category => (
        <CategoryComponent
          key={category.id}
          category={category}
          isSelected={isSelected}
          isWinner={isWinner}
          onClick={onClick}
        />
      ))}
    </div>
  )
}

export default Ballot
