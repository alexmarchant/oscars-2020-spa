import React, { BaseSyntheticEvent } from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import { useLocation } from 'react-router-dom'
import { Container, FormCheck } from 'react-bootstrap'
import CategoryComponent from './Category'
import { Category, Nominee } from '../../graphql/shared-types'
import {
  GET_CATEGORIES_AND_MY_SELECTIONS_AND_ME,
  GetCategoriesAndMySelectionsAndMeRes,
} from '../../graphql/queries'
import {
  MAKE_SELECTION,
  SET_WINNER,
  UPDATE_USER,
  MakeSelectionRes,
  MakeSelectionVars,
  UpdateUserRes,
  SetWinnerRes,
  SetWinnerVars,
  UpdateUserVars,
  makeSelectionCallback,
} from '../../graphql/mutations'
import {
  CATEGORY_UPDATED,
  CategoryUpdatedRes,
} from '../../graphql/subscriptions'

enum Mode {
  Admin,
  NonAdmin,
}

const Ballot: React.FC = () => {
  let location = useLocation()

  const { pathname } = location

  const mode: Mode = pathname === '/admin' ? Mode.Admin : Mode.NonAdmin

  const { loading, error, data } = useQuery<
    GetCategoriesAndMySelectionsAndMeRes
  >(GET_CATEGORIES_AND_MY_SELECTIONS_AND_ME)

  const [makeSelection] = useMutation<MakeSelectionRes, MakeSelectionVars>(
    MAKE_SELECTION,
    { update: makeSelectionCallback },
  )

  const [setWinner] = useMutation<SetWinnerRes, SetWinnerVars>(SET_WINNER)
  const [updateUser] = useMutation<UpdateUserRes, UpdateUserVars>(UPDATE_USER)

  useSubscription<CategoryUpdatedRes>(CATEGORY_UPDATED)

  if (loading || !data) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>

  console.log(data)

  // onClicks
  function isSelected(category: Category, nominee: Nominee): boolean {
    if (!data) return false
    if (mode === Mode.Admin) return false
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

  function categoryComplete(category: Category): boolean {
    if (!data) return false

    return data.mySelections.some(
      selection => selection.categoryId === category.id,
    )
  }

  const onClick = mode === Mode.Admin ? setWinnerToggle : makeSelection

  const completedCategories: number = data.mySelections.length
  const totalCategories: number = data.categories.length

  const handleCheckChange = (e: BaseSyntheticEvent) => {
    const updateValue = !e.target.checked

    console.log(!updateValue)

    updateUser({
      variables: {
        value: !updateValue,
      },
    })
  }

  return (
    <Container>
      <>
        {data.categories.map(category => (
          <CategoryComponent
            key={category.id}
            category={category}
            isSelected={isSelected}
            isWinner={isWinner}
            categoryComplete={categoryComplete}
            onClick={onClick}
          />
        ))}
        <div>
          <p>
            You have made a selection for {completedCategories}/
            {totalCategories} categories.
          </p>
          <FormCheck
            checked={data.me.paid}
            onChange={handleCheckChange}
            label="Send @amarchant $5 on Venmo"
          />
        </div>
      </>
    </Container>
  )
}

export default Ballot
