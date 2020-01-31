import React, { Dispatch, SetStateAction } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { User } from '../../graphql/shared-types'
import { GET_CATEGORIES_AND_MY_SELECTIONS } from '../../graphql/queries'
interface Props {
  user: User | undefined
  setToken: Dispatch<SetStateAction<string | null | undefined>>
}

const Header: React.FC<Props> = ({ user, setToken }) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES_AND_MY_SELECTIONS)

  let location = useLocation()

  const { pathname } = location
  if (loading || !data) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>

  const completedCategories: number = data && data.mySelections.length
  const totalCatgories: number = 24
  const loadingBarNow: number = Math.ceil((completedCategories / 24) * 100)

  return user ? (
    <Container className="fixed-top" style={{ backgroundColor: '#f9fbfd' }}>
      <Row>
        <Col>
          <div className="header-body my-4 py-2">
            <Row className="justify-content-between">
              <div>
                <h3 className="header-title mb-2">{user.name}</h3>
                <h6 className="header-pretitle">{user.email}</h6>
              </div>
              <div>
                <Link to="/ballot">Ballot</Link>
              </div>
              <div>
                <Link to="/leaderboard">Leaderboard</Link>
              </div>
              <div>
                <Link to="#" onClick={() => setToken(null)}>
                  Log Out
                </Link>
              </div>
            </Row>
            {pathname === '/ballot' && (
              <div className="py-2">
                <ProgressBar
                  now={loadingBarNow}
                  label={`${completedCategories}/${totalCatgories}`}
                />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  ) : null
}

export default Header
