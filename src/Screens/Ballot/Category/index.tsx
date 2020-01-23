import React from 'react'
import { Category, Nominee } from '../interfaces'
import NomineeComponent from './Nominee'

interface Props {
  category: Category
  isSelected: (category: Category, nominee: Nominee) => boolean
  isWinner: (nominee: Nominee) => boolean
  onClick: Function
}

const CategoryComponent = ({
  category,
  onClick,
  isSelected,
  isWinner,
}: Props) => {
  return (
    <div>
      <div key={category.id}>
        <div>
          {category.title} - {category.value}
        </div>
        <ul>
          {category.nominees.map(nominee => (
            <NomineeComponent
              key={nominee.id}
              category={category}
              nominee={nominee}
              isSelected={isSelected}
              isWinner={isWinner}
              onClick={onClick}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CategoryComponent
