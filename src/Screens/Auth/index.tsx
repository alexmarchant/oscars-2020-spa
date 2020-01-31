import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  BaseSyntheticEvent,
} from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Mode } from './interface'
import Login from './Login'
import Signup from './Signup'
import { FormData } from './interface'
import {
  LOGIN,
  SIGNUP,
  LoginRes,
  LoginVars,
  SignupRes,
  SignupVars,
} from '../../graphql/mutations'
import { Container, Row, Col, Alert, Card } from 'react-bootstrap'

interface Props {
  setToken: Dispatch<SetStateAction<string | null | undefined>>
}

const Auth: React.FC<Props> = ({ setToken }) => {
  const [error, setError] = useState<string | undefined>()
  let location = useLocation()

  const { pathname } = location

  const mode: Mode = pathname === '/login' ? Mode.Login : Mode.Signup

  const [login, loginRes] = useMutation<LoginRes, LoginVars>(LOGIN)
  const [signup, signupRes] = useMutation<SignupRes, SignupVars>(SIGNUP)

  const token = loginRes?.data?.login || signupRes?.data?.signup

  function postError(err: Error) {
    const cleanedError = err.message.replace('GraphQL error: ', '')
    setError(cleanedError)
    console.error(err)
  }

  async function onLogin(data: FormData, event?: BaseSyntheticEvent) {
    if (event) {
      event.preventDefault()
    }
    try {
      await login({ variables: { email: data.email, password: data.password } })
    } catch (err) {
      postError(err)
    }
  }

  async function onSignup(data: FormData, event?: BaseSyntheticEvent) {
    if (event) {
      event.preventDefault()
    }
    try {
      await signup({
        variables: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      })
    } catch (err) {
      postError(err)
    }
  }

  useEffect(() => {
    setToken(token)
  }, [token, setToken])

  let onSubmit = mode === Mode.Login ? onLogin : onSignup

  return (
    <div className="h-100 justify-content-center d-flex">
      <Container className="h-100">
        {error && (
          <Alert
            className="position-absolute"
            style={{ top: 10, left: 10, right: 10 }}
            variant="danger"
          >
            {error}
          </Alert>
        )}
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={5} xl={4}>
            <Card body className="justify-content-center">
              <h3 className="text-center">Instructions</h3>
              <ol>
                <li>Create Account/Sign in with email and password</li>
                <li>
                  Select one winner for each category (points are weighted)
                </li>
                <li>Send $5 to Alex Marchant (@amarchant) on Venmo</li>
              </ol>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={5} xl={4} className="my-5">
            <Route path="/login" match>
              <Login mode={mode} onSubmit={onSubmit} />
            </Route>
            <Route path="/signup" match>
              <Signup mode={mode} onSubmit={onSubmit} />
            </Route>
            <Route path="/" exact component={() => <Redirect to="/ballot" />} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Auth
