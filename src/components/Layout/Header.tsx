import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../../Store'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { User } from '../../graphql/shared-types'
interface Props {
  user: User | undefined
  setToken: Dispatch<SetStateAction<string | null | undefined>>
}

const Header: React.FC<Props> = ({ user, setToken }) => {
  const data: any = useContext(Store)

  // const data = { mySelections: [] }

  if (!data) return <div>...Loading</div>

  const completedCategories: number = data && data.mySelections.length
  const totalCatgories: number = 24
  const loadingBarNow: number = Math.ceil((completedCategories / 24) * 100)

  return user ? (
    <Container className="fixed-top">
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
            <ProgressBar
              now={loadingBarNow}
              label={`${completedCategories}/${totalCatgories}`}
            />
          </div>
        </Col>
      </Row>
    </Container>
  ) : null
}

export default Header
