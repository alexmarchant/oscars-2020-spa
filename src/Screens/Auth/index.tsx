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
    <div>
      <Route path="/login" match>
        <Login mode={mode} onSubmit={onSubmit} />
      </Route>
      <Route path="/signup" match>
        <Signup mode={mode} onSubmit={onSubmit} />
      </Route>
      <Route path="/" exact component={() => <Redirect to="/ballot" />} />
      {/* <Route path="/logout" component={Logout} /> */}
    </div>
  )
}

// const Auth = ({ setToken }: Props): JSX.Element => {
//   const { register, handleSubmit, errors } = useForm<FormData>()
//   const [mode, setMode] = useState(Mode.Signup)
//   const [login, loginRes] = useMutation<LoginRes, LoginVars>(LOGIN)
//   const [signup, signupRes] = useMutation<SignupRes, SignupVars>(SIGNUP)

//   const token = loginRes?.data?.login || signupRes?.data?.signup

//   useEffect(() => {
//     setToken(token)
//   }, [token, setToken])

//   async function onLogin(data: FormData, event: BaseSyntheticEvent) {
//     event.preventDefault()
//     await login({ variables: { email: data.email, password: data.password } })
//   }

//   async function onSignup(data: FormData, event: BaseSyntheticEvent) {
//     event.preventDefault()
//     await signup({
//       variables: {
//         name: data.name,
//         email: data.email,
//         password: data.password,
//       },
//     })
//   }

//   let onSubmit = mode === Mode.Login ? onLogin : onSignup

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {mode === Mode.Signup && (
//           <>
//             <label htmlFor="name">Name:</label>
//             <input type="text" name="name" ref={register({ required: true })} />
//             {errors.name && <span>Name is required</span>}
//             <br></br>
//           </>
//         )}
//         <label htmlFor="email">Email:</label>
//         <input type="text" name="email" ref={register({ required: true })} />
//         {errors.email && <span>Email is required</span>}
//         <br></br>
//         <label htmlFor="name">Password:</label>
//         <input
//           type="password"
//           name="password"
//           ref={register({ required: true })}
//         />
//         {errors.password && <span>Password is required</span>}
//         <br></br>
//         <input type="submit" value="Submit" />
//       </form>
//       {mode === Mode.Login && (
//         <button onClick={() => setMode(Mode.Signup)}>Sign Up</button>
//       )}
//       {mode === Mode.Signup && (
//         <button onClick={() => setMode(Mode.Login)}>Log In</button>
//       )}
//     </div>
//   )
// }

export default Auth
