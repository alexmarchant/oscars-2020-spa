import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Mode, FormData } from './interface'

interface Props {
  mode: Mode
  onSubmit: (
    data: FormData,
    event: React.BaseSyntheticEvent<object, any, any>,
  ) => Promise<void>
}

const Signup: React.FC<Props> = ({ mode, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm<FormData>()

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" ref={register({ required: true })} />
        {errors.name && <span>Name is required</span>}
        <br></br>

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

      <Link to="/login">Log In</Link>
    </div>
  )
}

export default Signup
