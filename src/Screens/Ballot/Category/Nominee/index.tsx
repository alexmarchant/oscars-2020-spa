import React from 'react'
import { Nominee, Category } from '../../interfaces'

interface Props {
  nominee: Nominee
  category: Category
  isSelected: (category: Category, nominee: Nominee) => boolean
  makeSelection: Function
}

const NomineeComponent = ({
  nominee,
  makeSelection,
  isSelected,
  category,
}: Props) => {
  const selectionHandler = () => {
    makeSelection({
      variables: {
        categoryId: category.id,
        nomineeId: nominee.id,
      },
    })
  }
  return (
    <div>
      <li
        key={nominee.id}
        style={{
          backgroundColor: isSelected(category, nominee) ? 'gold' : 'lightGrey',
          marginBottom: '5px',
          cursor: 'pointer',
        }}
        onClick={() => selectionHandler()}
      >
        {nominee.name} - {nominee.film}
      </li>
    </div>
  )
}

export default NomineeComponent
