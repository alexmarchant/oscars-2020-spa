import React from 'react'
import { Row, Col, Card, Image } from 'react-bootstrap'
import { CheckCircle, XCircle } from 'react-feather'
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
      return <CheckCircle color="green" />
    }
    if (loser) {
      return <XCircle color="red" />
    }

    // if (selected) {
    //   return (
    //     <Col className="col-auto">
    //       <CheckCircle color="gold" />
    //     </Col>
    //   )
    // }

    return null
  }

  const styles: {
    marginBottom: string
    cursor: string
    border: string
  } = {
    marginBottom: '5px',
    cursor: 'pointer',
    border: 'none',
  }

  if (isSelected(category, nominee)) {
    styles.border = '2px solid gold'
  }

  return (
    <Col key={nominee.id} className="col-6 col-md-3 col-xl-2 mb-4">
      <Card style={styles} onClick={() => selectionHandler()}>
        {nominee.imageURL && <Image
          src={nominee.imageURL}
          fluid
        />}
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
