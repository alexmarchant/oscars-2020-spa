import React from 'react'
import { Nominee, Category } from '../../interfaces'

interface Props {
  nominee: Nominee
  category: Category
  isSelected: (category: Category, nominee: Nominee) => boolean
  isWinner: (nominee: Nominee) => boolean
  onClick: Function
}

const NomineeComponent = ({
  nominee,
  onClick,
  isSelected,
  isWinner,
  category,
}: Props) => {
  const selectionHandler = () => {
    onClick({
      variables: {
        categoryId: category.id,
        nomineeId: nominee.id,
      },
    })
  }

  const generateBackgroundColor = (category: Category, nominee: Nominee) => {
    const selected = isSelected(category, nominee)
    const winner = isWinner(nominee)
    const loser = category.winnerId !== null && !winner && selected

    let color = 'lightGrey'

    if (selected) {
      color = 'gold'
    }

    if (winner) {
      color = 'green'
    }

    if (loser) {
      color = 'red'
    }

    return color
  }

  return (
    <div>
      <li
        key={nominee.id}
        style={{
          backgroundColor: generateBackgroundColor(category, nominee),
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
