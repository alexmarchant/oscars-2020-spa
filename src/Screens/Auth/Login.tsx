import React from 'react'
import { useForm } from 'react-hook-form'
import { Mode, FormData } from './interface'
import { Link } from 'react-router-dom'

interface Props {
  mode: Mode
  onSubmit: (
    data: FormData,
    event: React.BaseSyntheticEvent<object, any, any>,
  ) => Promise<void>
}

const Login: React.FC<Props> = ({ mode, onSubmit }, props) => {
  const { register, handleSubmit, errors } = useForm<FormData>()

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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

      <Link to="/signup">Sign Up</Link>
    </div>
  )
}

export default Login
