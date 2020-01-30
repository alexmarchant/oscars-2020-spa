import React from 'react'
import { Row, Col, Collapse } from 'react-bootstrap'
import { Check } from 'react-feather'

import { Category, Nominee } from '../../../graphql/shared-types'
import NomineeComponent from './Nominee'

interface Props {
  category: Category
  isSelected: (category: Category, nominee: Nominee) => boolean
  isWinner: (nominee: Nominee) => boolean
  categoryComplete: (category: Category) => boolean
  onClick: Function
}

const CategoryComponent = ({
  category,
  isSelected,
  isWinner,
  categoryComplete,
  onClick,
}: Props) => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Row>
        <Col>
          <div className="header-body my-4 py-2">
            <Row onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
              <Col>
                <h1 className="header-title mb-2">{category.title}</h1>
                <h6 className="header-pretitle">{category.value} points</h6>
              </Col>
              <Col className="col-auto">
                {categoryComplete(category) && <Check />}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Collapse in={open}>
        <Row className="justify-content-md-center">
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
      </Collapse>
    </>
  )
}

export default CategoryComponent
