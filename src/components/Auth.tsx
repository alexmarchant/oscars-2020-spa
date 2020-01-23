import React, {
  useState,
  BaseSyntheticEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

const SIGNUP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password)
  }
`

interface FormData {
  name: string
  email: string
  password: string
}

enum Mode {
  Login,
  Signup,
}

interface Props {
  setToken: Dispatch<SetStateAction<string | null | undefined>>
}

interface LoginRes {
  login: string
}

interface LoginVars {
  email: string
  password: string
}

interface SignupRes {
  signup: string
}

interface SignupVars {
  name: string
  email: string
  password: string
}

const Auth = ({ setToken }: Props): JSX.Element => {
  const { register, handleSubmit, errors } = useForm<FormData>()
  const [mode, setMode] = useState(Mode.Signup)
  const [login, loginRes] = useMutation<LoginRes, LoginVars>(LOGIN)
  const [signup, signupRes] = useMutation<SignupRes, SignupVars>(SIGNUP)

  const token = loginRes?.data?.login || signupRes?.data?.signup

  useEffect(() => {
    setToken(token)
  }, [token, setToken])

  async function onLogin(data: FormData, event: BaseSyntheticEvent) {
    event.preventDefault()
    await login({ variables: { email: data.email, password: data.password } })
  }

  async function onSignup(data: FormData, event: BaseSyntheticEvent) {
    event.preventDefault()
    await signup({
      variables: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    })
  }

  let onSubmit = mode === Mode.Login ? onLogin : onSignup

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {mode === Mode.Signup && (
          <>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" ref={register({ required: true })} />
            {errors.name && <span>Name is required</span>}
            <br></br>
          </>
        )}
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" ref={register({ required: true })} />
        {errors.email && <span>Email is required</span>}
        <br></br>
        <label htmlFor="name">Password:</label>
        <input
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && <span>Password is required</span>}
        <br></br>
        <input type="submit" value="Submit" />
      </form>
      {mode === Mode.Login && (
        <button onClick={() => setMode(Mode.Signup)}>Sign Up</button>
      )}
      {mode === Mode.Signup && (
        <button onClick={() => setMode(Mode.Login)}>Log In</button>
      )}
    </div>
  )
}

export default Auth
