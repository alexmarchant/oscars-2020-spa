import React from 'react'
import { Row } from 'react-bootstrap'
import { Category, Nominee } from '../../../graphql/shared-types'
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
    <>
      <Row>
        {category.title} - {category.value}
      </Row>
      <Row key={category.id}>
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
      </Row>
    </>
  )
}

export default CategoryComponent
