import React from 'react'
import { Row, Col, Card, Image } from 'react-bootstrap'
import { CheckCircle } from 'react-feather'
import { Nominee, Category } from '../../../../graphql/shared-types'

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

  const coloredCheckMark = (category: Category, nominee: Nominee) => {
    const selected = isSelected(category, nominee)
    const winner = isWinner(nominee)
    const loser = category.winnerId !== null && !winner && selected

    if (winner) {
      return (
        <Col className="col-auto">
          <CheckCircle color="green" />
        </Col>
      )
    }
    if (loser) {
      return (
        <Col className="col-auto">
          <CheckCircle color="red" />
        </Col>
      )
    }

    if (selected) {
      return (
        <Col className="col-auto">
          <CheckCircle color="gold" />
        </Col>
      )
    }

    return null
  }

  return (
    <Col key={nominee.id} className="col-12 col-md-6 col-xl-4 mb-4">
      <Card
        style={{
          marginBottom: '5px',
          cursor: 'pointer',
        }}
        onClick={() => selectionHandler()}
      >
        <Image
          src="https://static01.nyt.com/images/2019/10/10/arts/10parasitecoverpix/merlin_162276381_35b982ba-822c-4914-98b6-083a213beaec-master495.jpg"
          fluid
        />
        <Card.Body>
          <Row>
            <Col>
              <h4 className="mb-2">{nominee.name}</h4>
              {nominee.name !== nominee.film && (
                <p className="small muted mb-0">{nominee.film}</p>
              )}
            </Col>
            {coloredCheckMark(category, nominee)}
          </Row>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default NomineeComponent
