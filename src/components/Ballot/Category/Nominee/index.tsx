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
  return (
    <div>
      <li
        key={nominee.id}
        style={{
          backgroundColor: isSelected(category, nominee)
            ? 'green'
            : 'transparent',
        }}
      >
        {nominee.name} - {nominee.film}
        <button
          onClick={() => {
            makeSelection({
              variables: {
                categoryId: category.id,
                nomineeId: nominee.id,
              },
            })
          }}
        >
          Pick
        </button>
      </li>
    </div>
  )
}

export default NomineeComponent
