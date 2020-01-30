import React, { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap'
import { User } from '../../graphql/shared-types'
interface Props {
  user: User | undefined
  setToken: Dispatch<SetStateAction<string | null | undefined>>
}

const Header: React.FC<Props> = ({ user, setToken }) => {
  const totalCatgories: number = 24
  const completedCategories: number = 16
  return user ? (
    <Container className="fixed-top bg-white">
      <Row>
        <Col>
          <div className="header-body my-4 py-2">
            <Row>
              <Col className="col-auto">
                <h3 className="header-title mb-2">{user.name}</h3>
                <h6 className="header-pretitle">{user.email}</h6>
              </Col>
              <Col>
                <Link to="/ballot">Ballot</Link>
                &nbsp; | &nbsp;
                <Link to="/leaderboard">Leaderboard</Link>
              </Col>
              <Col className="col-auto">
                <Link to="#" onClick={() => setToken(null)}>
                  Log Out
                </Link>
              </Col>
            </Row>
            <ProgressBar
              now={60}
              label={`${completedCategories}/${totalCatgories}`}
            />
          </div>
        </Col>
      </Row>
    </Container>
  ) : null
}

export default Header
