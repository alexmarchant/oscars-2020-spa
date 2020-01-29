import React, {
  useEffect,
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
import { Container, Row, Col } from 'react-bootstrap'

interface Props {
  setToken: Dispatch<SetStateAction<string | null | undefined>>
}

const Auth: React.FC<Props> = ({ setToken }) => {
  let location = useLocation()

  const { pathname } = location

  const mode: Mode = pathname === '/login' ? Mode.Login : Mode.Signup

  const [login, loginRes] = useMutation<LoginRes, LoginVars>(LOGIN)
  const [signup, signupRes] = useMutation<SignupRes, SignupVars>(SIGNUP)

  const token = loginRes?.data?.login || signupRes?.data?.signup

  async function onLogin(data: FormData, event?: BaseSyntheticEvent) {
    if (event) {
      event.preventDefault()
    }
    await login({ variables: { email: data.email, password: data.password } })
  }

  async function onSignup(data: FormData, event?: BaseSyntheticEvent) {
    if (event) {
      event.preventDefault()
    }
    await signup({
      variables: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    })
  }

  useEffect(() => {
    setToken(token)
  }, [token, setToken])

  let onSubmit = mode === Mode.Login ? onLogin : onSignup

  return (
    <div className="h-100 justify-content-center d-flex">
      <Container>
        <Row className="justify-content-center align-items-center h-100">
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
