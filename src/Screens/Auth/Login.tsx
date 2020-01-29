import React, { BaseSyntheticEvent } from 'react'
import { useForm } from 'react-hook-form'
import { Mode, FormData } from './interface'
import { Link } from 'react-router-dom'
import { Button, FormGroup } from 'react-bootstrap'

interface Props {
  mode: Mode
  onSubmit: (data: FormData, event?: BaseSyntheticEvent) => Promise<void>
}

const Login: React.FC<Props> = ({ mode, onSubmit }, props) => {
  const { register, handleSubmit, errors } = useForm<FormData>()

  return (
    <>
      <h1 className="display-4 text-center mb-3">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            ref={register({ required: true })}
            placeholder="name@address.com"
          />
          {errors.email && <span>Email is required</span>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="name">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            ref={register({ required: true })}
            placeholder="Enter your password"
          />
          {errors.password && <span>Password is required</span>}
        </FormGroup>
        <Button className="mb-3" variant="primary" block={true}>
          Sign In
        </Button>
      </form>

      <div className="text-center">
        <small className="text-muted text-center">
          Don't have an account yet?&nbsp;
          <Link to="/signup">Sign Up</Link>
        </small>
      </div>
    </>
  )
}

export default Login
