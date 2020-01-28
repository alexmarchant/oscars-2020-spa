import React from 'react'
import { Row, Col } from 'react-bootstrap'
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
        <Col className="col">
          <div className="header-body my-4 py-2">
            <h1 className="header-title mb-2">{category.title}</h1>
            <h6 className="header-pretitle">{category.value} points</h6>
          </div>
        </Col>
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
